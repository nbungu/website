// client/src/components/NewsPost.js

import React, { useState, useEffect } from "react";
import Header from './Header';
import Footer from './Footer';
import LoadingSpinner from "./LoadingSpinner";
import NewsPostStartingElement from "./NewsPostStartingElement";
import NewsPostContentElement from "./NewsPostContentElement";
import { formatPublishedAt, STRAPI_CMS_URL } from '../utils/Utils';
import { Link } from "react-router-dom";

// Keep onPostClicked for this Component to Re-Render. 
// necessary to reload this component but with another postId
// Triggered from within this component by the More Posts List
function NewsPost({ postId }) {

  const [selectedPostId, setSelectedPostId] = useState(postId);
  const [post, setPost] = useState(null);
  const [featuredPosts, setFeaturedPosts] = useState(null);

  // Returns the currently shown post by id and with media data
  const queryString = STRAPI_CMS_URL + "/api/posts/" + selectedPostId + "?populate=*";
  // Returns 6 posts including media data sorted by date
  const queryString2 = STRAPI_CMS_URL + "/api/posts?sort=publishedAt:desc&populate=*&pagination[start]=0&pagination[limit]=6"

  const fetchPost = () => {
    return fetch(queryString)
      .then((response) => response.json())
      .then((result) => setPost(result.data))
  }
  const fetchFeaturedPosts = () => {
    return fetch(queryString2)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {setFeaturedPosts(result.data)})
      .catch((error) => {
        console.error('Error fetching featured posts:', error);
        // You can handle the error here, such as displaying an error message to the user
      });
  };

  // empty dependency array: useEffect will run once, immediately after the component is mounted (the first render of the component)
  useEffect(() => {
    fetchPost();
    fetchFeaturedPosts();
  }, [selectedPostId]);

  return (
    <div className='body-bg'>
      
      <Header currentPage={"news"}/>

      <div className="container-sm p-3">

        <div className="row g-5">

          {/* NEWS POST CONTENT */}
          <div class="col-lg-9">
            {!post ? <LoadingSpinner/> :
              <div className='vstack gap-3'>
                <NewsPostStartingElement newsPostUpVotes={post.attributes.upvotes} newsPostDownVotes={post.attributes.downvotes} postId={post.id}/>
                <div className="fixed-tile">
                  <h1>{post.attributes.title}</h1>
                  <p className="text-body-secondary py-2">Veröffentlicht am: {formatPublishedAt(post.attributes.publishedAt)}</p>
                  <NewsPostContentElement newsPost={post}/>
                </div>
              </div>
            }
          </div>

          {/* MORE POSTS LIST */}
          <div class="col-lg-3">
            <div className="position-sticky">
              <h1 className="pb-3">Weitere Beiträge</h1>
              <ul class="list-unstyled">
                {!featuredPosts ? <LoadingSpinner/> :
                  <li>
                    {featuredPosts.map((post) => (
                      <a href='#' onClick={()=>{setSelectedPostId(post.id)}} class="d-flex flex-column flex-sm-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top">
                        <img className="col d-none d-sm-block test-img rounded" src={STRAPI_CMS_URL + post.attributes.titleimage?.data?.attributes.url} alt=""/>
                        <div class="col-sm-8">
                          <h6 class="mb-0">{post.attributes.title}</h6>
                          <small class="text-body-secondary">{formatPublishedAt(post.attributes.publishedAt)}</small>
                        </div>
                      </a>
                    ))}
                  </li>
                }                  
              </ul>
            </div>
          </div>

        </div>

        <div className="row mt-3 justify-content-between">
          <div className="col-auto">
            <Link className='btn btn-light' to="/news"><i className="bi bi-arrow-left pe-2"/>Alle News</Link>
          </div>
        </div>

      </div>

      <Footer/>

      <p className="text-center">{queryString}</p>

    </div>
  )
}

export default NewsPost

/**


      <div className="flex-grow-1">

        {!post ? <LoadingSpinner/> :
          <div className='tiles-container'>
            <NewsPostStartingElement newsPostUpVotes={post.attributes.upvotes} newsPostDownVotes={post.attributes.downvotes} postId={post.id}/>
            <div className="fixed-tile">
              <h1>{post.attributes.title}</h1>
              <p className="text-body-secondary py-2">Veröffentlicht am: {formatPublishedAt(post.attributes.publishedAt)}</p>
              <NewsPostContentElement newsPost={post}/>
            </div>
            <NewsPostEndingElement onPostClicked={onPostClicked}/>
          </div>
        }

      </div>

 */