// client/src/components/NewsPostEndingElement.js

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { STRAPI_CMS_URL } from '../utils/Utils.js';
import NewsList from "./NewsList";
import LoadingSpinner from "./LoadingSpinner.js";

function NewsPostEndingElement({ onPostClicked }) {
  
  const [posts, setPosts] = useState(null);

  // Returns 4 posts sorted by date
  const queryString = STRAPI_CMS_URL + "/api/posts?sort=publishedAt:desc&pagination[start]=0&pagination[limit]=4";

  // GET Request to STRAPI server (backend) at endpoint /api/posts
  const fetchPosts = () => {
    return fetch(queryString)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => setPosts(result.data))
      .catch((error) => {
        console.error('Error fetching posts:', error);
        // You can handle the error here, such as displaying an error message to the user
      });
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    
    <div className="tile-container">
      
      <div className="row justify-content-between">
        <div className="col-auto">
          <Link className='btn btn-light' to="/news"><i className="bi bi-arrow-left pe-2"/>Alle News</Link>
        </div>
      </div>

    </div>

  )
}

export default NewsPostEndingElement

/**

      <div className="fixed-tile gap-3">
        <h2>Weitere Artikel</h2>
        {!posts ? <LoadingSpinner message={"Lade News Liste..."}/> : <NewsList newsPosts={posts} onPostClicked={onPostClicked}/>}
      </div>

 */