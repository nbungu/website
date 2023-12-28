// client/src/components/HeaderBanner.js

import React, { useState, useEffect } from "react";
import { STRAPI_CMS_URL } from '../utils/Utils.js';

function HeaderBanner() {

    // Returns all posts including media data sorted by date
    const queryString = STRAPI_CMS_URL + "/api/header-message";

    // GET Request to STRAPI server (backend) at endpoint /api/posts
    const [headerMessage, setHeaderMessage] = useState(null);

    const fetchHeaderMessage = () => {
        return fetch(queryString)
        .then((response) => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((result) => setHeaderMessage(result.data))
        .catch((error) => {
            console.error('Error fetching featured posts:', error);
            // You can handle the error here, such as displaying an error message to the user
        });
    };

    // We want fetchCarouselBanners() to be executed everytime App component loads
    useEffect(() => {
        fetchHeaderMessage();
    }, []);
    
    return (        
        <div className="container-fluid bg-warning">
            <div className='header-banner-temp text-center'>
                {headerMessage?.attributes?.message && <p>{headerMessage.attributes.message}</p>}
            </div>
        </div>
  )
}

export default HeaderBanner