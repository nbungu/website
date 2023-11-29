// client/src/components/RecentNews.js

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Featurette from "./Featurette.js";
import LoadingSpinner from "./LoadingSpinner.js";
import { STRAPI_CMS_URL } from '../utils/Utils.js';

function RecentNews({ onPostClicked }) {  

    // fetches the last two most recent posts in sorted order
    const queryString = STRAPI_CMS_URL + "/api/posts?populate=*&sort=publishedAt:desc&pagination[start]=0&pagination[limit]=2";
    const [featuredPosts, setFeaturedPosts] = useState(null);
  
    const fetchFeaturedPosts = () => {
      return fetch(queryString)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => setFeaturedPosts(result.data))
        .catch((error) => {
          console.error('Error fetching featured posts:', error);
          // You can handle the error here, such as displaying an error message to the user
        });
    };

    // We want fetchPosts() to be executed everytime App component loads
    useEffect(() => {
      fetchFeaturedPosts();
    }, []);

  return (
    <div>
      {!featuredPosts ? <LoadingSpinner message={"Lade News..."}/> :
        <div className='px-5'>
          {featuredPosts.map((post) => (
            <Featurette featuredNewsPost={post} onPostClicked={onPostClicked}/>
          ))}
        </div>
      }
    </div>    
  )
}

export default RecentNews

/*

  const fetchFeaturedPosts = () => {
    return fetch(queryString)
      .then((response) => response.json())
      .then((result) => setFeaturedPosts(result.data))
  }

 */