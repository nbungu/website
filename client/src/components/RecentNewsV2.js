// client/src/components/RecentNewsV2.js

import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner.js";
import { formatPublishedAt, STRAPI_CMS_URL } from '../utils/Utils.js';
import { Link } from "react-router-dom";
import defaultImg from '../assets/default-image.png'

function RecentNewsV2({ onPostClicked }) {  

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
    <div className="tiles-container">
      <h1 class="mb-2">Neueste Beiträge</h1>
      
      {!featuredPosts ? <LoadingSpinner message={"Lade News..."}/> :
        featuredPosts.map((post) => (         
          <div class="row">
            <div class="col-md-12">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-2 shadow h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text-primary-emphasis">{post.attributes.type}</strong>
                  <h3 class="mb-0">{post.attributes.title}</h3>
                  <div class="mb-1 text-body-secondary">{formatPublishedAt(post.attributes.publishedAt)}</div>
                  <p class="card-text mb-auto">{post.attributes.summary}</p>
                  <Link class="icon-link gap-1 icon-link-hover stretched-link" to={`/news/${post.id}`} onClick={()=>{onPostClicked(post.id)}}>
                    Continue reading
                    <i class="bi bi-chevron-right"></i>
                  </Link>
                </div>
                <div class="col-auto d-none d-lg-block test">
                  <img src={post.attributes.titleimage.data.attributes.url ? STRAPI_CMS_URL + post.attributes.titleimage.data.attributes.url : defaultImg} alt="..."/>
                </div>
              </div>           
            </div>
          </div>
        ))
      }
      <Link className="btn btn-secondary" to="/news"><i class="bi bi-arrow-repeat pe-2"/>Mehr News laden</Link>
    </div>    
  )
}

export default RecentNewsV2