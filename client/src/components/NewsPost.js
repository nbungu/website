// client/src/components/NewsPost.js

import React, { useState, useEffect } from "react";
import Header from './Header';
import Footer from './Footer';
import LoadingSpinner from "./LoadingSpinner";
import NewsPostStartingElement from "./NewsPostStartingElement";
import NewsPostContentElement from "./NewsPostContentElement";
import NewsPostEndingElement from "./NewsPostEndingElement";
import { formatPublishedAt, STRAPI_CMS_URL } from '../utils/Utils';

function NewsPost({ postId }) {
  
  // Returns a post by id and with media data
  const queryString = STRAPI_CMS_URL + "/api/posts/" + postId + "?populate=*";

  // GET Request to STRAPI server (backend) at endpoint /api/posts
  const [post, setPost] = useState(null);

  const fetchPost = () => {
    return fetch(queryString)
      .then((response) => response.json())
      .then((result) => setPost(result.data))
  }

  // We want fetchPost() to be executed everytime App component loads
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className='body-bg d-flex flex-column'>
      
      <Header currentPage={"news"}/>

      <div className="flex-grow-1">

        {!post ? <LoadingSpinner/> :
          <div className='tiles-container'>
            <NewsPostStartingElement newsPostUpVotes={post.attributes.upvotes} newsPostDownVotes={post.attributes.downvotes} postId={post.id}/>
            <div className="fixed-tile">
              <h1 className="featurette-heading fw-normal lh-1">{post.attributes.title}</h1>
              <p className="lead">Veröffentlicht am: {formatPublishedAt(post.attributes.publishedAt)}</p>
              <NewsPostContentElement newsPost={post}/>
            </div>
            
          </div>
        }

      </div>

      <Footer/>

      <p className="text-center">{queryString}</p>

    </div>
  )
}

export default NewsPost