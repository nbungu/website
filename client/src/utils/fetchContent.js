import { useEffect, useState } from 'react';
import { STRAPI_CMS_URL } from './Utils';

export const usePlayers = () => {
    const [players, setPlayers] = useState(null);
    const queryString = STRAPI_CMS_URL + "/api/players?populate=thumbnail&pagination[pageSize]=100"
    
    useEffect(() => {
        const fetchContent = async () => {
            const response = await fetch(queryString);
            const result = await response.json();
            setPlayers(result.data);
        };
        fetchContent();
    }, []);

    return players;
};

export const useManagers = () => {
    const [managers, setManagers] = useState(null);
    const queryString = STRAPI_CMS_URL + "/api/managers?populate=thumbnail";
    
    useEffect(() => {
        const fetchContent = async () => {
            const response = await fetch(queryString);
            const result = await response.json();
            setManagers(result.data);
        };
        fetchContent();
    }, []);

    return managers;
};

export const useImpressum = () => {
    const [pageContent, setPageContent] = useState(null);
    const queryString = STRAPI_CMS_URL + "/api/impressum-page";
    
    useEffect(() => {
        const fetchContent = async () => {
            const response = await fetch(queryString);
            const result = await response.json();
            setPageContent(result.data);
        };
        fetchContent();
    }, []);

    return pageContent;
};

export const useCarouselBanners = () => {
    const [bannerContent, setBannerContent] = useState(null);
    const queryString = STRAPI_CMS_URL + "/api/header-text-slider";
    
    useEffect(() => {
        const fetchContent = async () => {
            const response = await fetch(queryString);
            const result = await response.json();
            setBannerContent(result.data);
        };
        fetchContent();
    }, []);

    return bannerContent;
};

// added id as a dependency in the useEffect dependency array to ensure that the effect is re-run whenever the id changes
export const usePost = (id) => {
    const [post, setPost] = useState(null);
    const queryString = STRAPI_CMS_URL + "/api/posts/" + id + "?populate=*";

    useEffect(() => {
        const fetchContent = async () => {
            const response = await fetch(queryString);
            const result = await response.json();
            setPost(result.data);
            // Set Title Tag
            document.title = result.data.attributes.title;
        };
        fetchContent();
    }, [id]);

    return post;
};

export const usePosts = (paginationLimit, sortOrder) => {
    if (!paginationLimit) paginationLimit = 50;
    if (!sortOrder) sortOrder = "desc";

    const [posts, setPosts] = useState(null);
    const queryString = STRAPI_CMS_URL + "/api/posts?sort=publishedAt:" + sortOrder + "&populate=*&pagination[start]=0&pagination[limit]=" + paginationLimit;
    
    useEffect(() => {
        const fetchContent = async () => {
            const response = await fetch(queryString);
            const result = await response.json();
            setPosts(result.data);
        };
        fetchContent();
    }, [paginationLimit, sortOrder]);
    const reversedPosts = posts ? [...posts].reverse() : null;
    
    return { posts, reversedPosts };
};

export const useEvents = () => {
    const [events, setEvents] = useState(null);
    const queryString = STRAPI_CMS_URL + "/api/events?populate=*&sort=date:asc";
    
    useEffect(() => {
        const fetchContent = async () => {
            const response = await fetch(queryString);
            const result = await response.json();
            setEvents(result.data);
        };
        fetchContent();
    }, []);
    const reversedEvents = events ? [...events].reverse() : null;
    return { events, reversedEvents };
};

export const useMatches = (showOnlyEisbuabaMatches, showOnlyFinishedMatches, paginationLimit) => {
    if (!paginationLimit) paginationLimit = 50;
    const [matches, setMatches] = useState(null);
    
    const queryString = STRAPI_CMS_URL + "/api/matches?populate[teamHome][populate][0]=logo&populate[teamAway][populate][0]=logo&pagination[start]=0&pagination[limit]="+paginationLimit+"&populate[post][fields][0]=id&sort=faceoffTime:desc";

    useEffect(() => {
        const fetchContent = async () => {
            const response = await fetch(queryString);
            const result = await response.json();
            let filteredData = result.data;
            if (showOnlyEisbuabaMatches) {
                filteredData = filteredData.filter(entry => entry.attributes.teamHome.data.attributes.name === 'Eisbuaba Adelberg' || entry.attributes.teamAway.data.attributes.name === 'Eisbuaba Adelberg');
            }
            if (showOnlyFinishedMatches) {
                filteredData = filteredData.filter(entry => entry.attributes.hasFinished);
            }            
            setMatches(filteredData);
        };
        fetchContent();
    }, []);
    const reversedMatches = matches ? [...matches].reverse() : null;
    return { matches, reversedMatches };
};