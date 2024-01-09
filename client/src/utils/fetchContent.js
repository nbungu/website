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

export const usePosts = (maxNumberOfPosts, sortOrder) => {
    if (!maxNumberOfPosts) maxNumberOfPosts = 50;
    if (!sortOrder) sortOrder = "desc";

    const [posts, setPosts] = useState(null);
    const queryString = STRAPI_CMS_URL + "/api/posts?sort=publishedAt:" + sortOrder + "&populate=*&pagination[start]=0&pagination[limit]=" + maxNumberOfPosts;
    
    useEffect(() => {
        const fetchContent = async () => {
            const response = await fetch(queryString);
            const result = await response.json();
            setPosts(result.data);
        };
        fetchContent();
    }, [maxNumberOfPosts, sortOrder]);

    return posts;
};