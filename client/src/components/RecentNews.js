// client/src/components/RecentNews.js

import React, { useState, useEffect } from "react";
import { formatPublishedAt, STRAPI_CMS_URL } from '../utils/Utils.js';
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner.js";
import defaultImg from '../assets/default-image.webp'

function RecentNews() {  
  
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
      <h1 className="mb-2">Neueste Beiträge</h1>
      
      {!featuredPosts ? <LoadingSpinner message={"Lade News..."}/> :
        featuredPosts.map((post) => (         
          <div className="row">
            <div className="col-md-12">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-2 shadow h-md-250 position-relative">
                {/* TEXT COL */}
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary-emphasis">{post.attributes.type}</strong>
                  <h3 className="mb-0">{post.attributes.title}</h3>
                  <div className="mb-1 text-body-secondary">{formatPublishedAt(post.attributes.publishedAt)}</div>
                  <p className="card-text mb-auto">{post.attributes.summary}</p>
                  <Link to={`/news/${post.id}`} className="icon-link gap-1 icon-link-hover stretched-link">
                    Weiterlesen
                    <i className="bi bi-chevron-right"></i>
                  </Link>
                </div>
                {/* IMAGE COL */}
                <div className="col-auto d-none d-md-block test">
                  <img src={post.attributes.titleimage?.data?.attributes.url ? STRAPI_CMS_URL + post.attributes.titleimage.data.attributes.url : defaultImg} alt={"News Post " + post.id + " titleimage"}/>
                </div>
              </div>           
            </div>
          </div>
        ))
      }
      <Link className="btn btn-light" to="/news"><i className="bi bi-arrow-repeat pe-2"/>Mehr News laden</Link>
    </div>    
  )
}

export default RecentNews