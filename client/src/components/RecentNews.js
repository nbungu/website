// client/src/components/RecentNews.js

import React from "react";
import { Link } from "react-router-dom";
import { formatPublishedAt, STRAPI_CMS_URL } from '../utils/Utils.js';

import defaultImg from '../assets/default-image.webp'

function RecentNews({ recentNews }) {  
  
  return (
    <>
      <div className="hstack justify-content-between align-items-center mb-2 z-1">
        <h1>Neueste Beiträge</h1>
        <Link className="icon-link gap-1 icon-link-hover" to={"/news"}>Alle News<i className="bi bi-chevron-right"></i></Link>
      </div>

      {recentNews.map((post, index) => (         
        <div className="row" key={index}>
          <div className="col-md-12">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-2 shadow h-md-250 position-relative">
              {/* TEXT COL */}
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary-emphasis">{post.attributes.type}</strong>
                <h2 className="fw-bold mb-0">{post.attributes.title}</h2>
                <div className="mb-1 text-body-secondary">{formatPublishedAt(post.attributes.publishedAt)}</div>
                <p className="card-text mb-auto">{post.attributes.summary}</p>
                <Link to={`/news/${post.id}`} className="icon-link gap-1 icon-link-hover stretched-link">
                  Weiterlesen
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
              {/* IMAGE COL */}
              <div className="col-auto d-none d-md-block recent-news-img">
                <img src={post.attributes.titleimage?.data?.attributes.url ? STRAPI_CMS_URL + post.attributes.titleimage.data.attributes.url : defaultImg} alt={"News Post " + post.id + " titleimage"}/>
              </div>
            </div>           
          </div>
        </div>
      ))
      }
      
      
    </>
  )
}

export default RecentNews