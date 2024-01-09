// client/src/components/RecentNews.js

import React from "react";
import { Link } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner.js";
import defaultImg from '../assets/default-image.webp'

import { formatPublishedAt, STRAPI_CMS_URL } from '../utils/Utils.js';
import { usePosts } from "../utils/fetchContent";

function RecentNews() {  
  
  const maxNumberOfPosts = 2;
  const featuredPosts = usePosts(maxNumberOfPosts);

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
      <Link className="btn btn-light" to="/news"><i className="bi bi-arrow-repeat pe-2"/>Alle News anzeigen</Link>
    </div>    
  )
}

export default RecentNews