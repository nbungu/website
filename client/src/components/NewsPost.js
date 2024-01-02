// client/src/components/NewsPost.js

import React, { useState, useEffect } from "react";
import { formatPublishedAt, STRAPI_CMS_URL, PUBLIC_URL } from '../utils/Utils';
import { Link, useParams } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';
import LoadingSpinner from "./LoadingSpinner";
import NewsPostStartingElement from "./NewsPostStartingElement";
import NewsPostContentElement from "./NewsPostContentElement";

import defaultImg from '../assets/default-image.webp'

function NewsPost() {

  // Dynamic Routing
  const params = useParams();
  // params.id => dynamic value defined as id in route
  // e.g '/news/1234' -> params.id equals 1234

  const id = params.id;  
  const [post, setPost] = useState(null);
  const [featuredPosts, setFeaturedPosts] = useState(null);

  // Returns the currently shown post by id and with media data
  const queryString = STRAPI_CMS_URL + "/api/posts/" + id + "?populate=*";
  // Returns 6 posts including media data sorted by date
  const queryString2 = STRAPI_CMS_URL + "/api/posts?sort=publishedAt:desc&populate=*&pagination[start]=0&pagination[limit]=6"

  const fetchPost = () => {
    return fetch(queryString)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } 
      return response.json();
    })
    .then((result) => {
      setPost(result.data);
      updateMetaTags(result.data);
    })
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
  };

  const updateMetaTags = (post) => {
    // Update Open Graph meta tags dynamically
    // Executes if post is truthy
    if (post) {
      const shareImg = post.attributes.decorImage?.data && STRAPI_CMS_URL + post.attributes.decorImage.data.attributes.url;
      const titleImg = post.attributes.titleimage?.data && STRAPI_CMS_URL + post.attributes.titleimage.data.attributes.url;

      document.title = post.attributes.title;
      document.querySelector('meta[property="og:title"]').setAttribute('content', post.attributes.title);
      document.querySelector('meta[property="og:description"]').setAttribute('content', post.attributes.summary);
      document.querySelector('meta[property="og:url"]').setAttribute('content', `https://eisbuaba-adelberg.de/news/${post.id}`);
      document.querySelector('meta[property="og:type"]').setAttribute('content', 'article');
      document.querySelector('meta[property="og:image"]').setAttribute('content', shareImg ? shareImg : (titleImg ? titleImg : PUBLIC_URL + defaultImg));
      document.querySelector('meta[property="og:image:width"]').setAttribute('content', '1024');
      document.querySelector('meta[property="og:image:height"]').setAttribute('content', '512');
    }
  };

  
  useEffect(() => {
    fetchPost();
    fetchFeaturedPosts();
  }, [id]);

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
              <h1 className="mb-2">Weitere Beiträge</h1>
              <ul class="list-unstyled">
                {!featuredPosts ? <LoadingSpinner/> :
                  <li>
                    {featuredPosts.map((post) => (
                      <Link to={'/news/'+post.id} class="d-flex flex-column flex-sm-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-bottom">
                        <img className="col d-none d-sm-block test-img rounded" src={post.attributes.titleimage?.data?.attributes?.url ? STRAPI_CMS_URL + post.attributes.titleimage.data.attributes.url : defaultImg} alt=""/>
                        <div class="col-sm-8">
                          <h6 class="mb-0">{post.attributes.title}</h6>
                          <small class="text-body-secondary">{formatPublishedAt(post.attributes.publishedAt)}</small>
                        </div>
                      </Link>
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

    </div>
  )
}

export default NewsPost

/**

<Link to={'/news/'+post.id} onClick={()=>{setSelectedPostId(post.id)}} class="d-flex flex-column flex-sm-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-bottom">
  <img className="col d-none d-sm-block test-img rounded" src={post.attributes.titleimage?.data?.attributes?.url ? STRAPI_CMS_URL + post.attributes.titleimage.data.attributes.url : defaultImg} alt=""/>
  <div class="col-sm-8">
    <h6 class="mb-0">{post.attributes.title}</h6>
    <small class="text-body-secondary">{formatPublishedAt(post.attributes.publishedAt)}</small>
  </div>
</Link>

 */