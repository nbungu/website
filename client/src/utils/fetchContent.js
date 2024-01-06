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