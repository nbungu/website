// client/src/components/NewsPost.js

import React from "react";
import { Link, useParams } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';
import LoadingSpinner from "./LoadingSpinner";
import NewsPostStartingElement from "./NewsPostStartingElement";
import NewsPostContentElement from "./NewsPostContentElement";

import defaultImg from '../assets/default-image.webp'

import { usePosts, usePost } from "../utils/fetchContent";
import { formatPublishedAt, STRAPI_CMS_URL } from '../utils/Utils';

function NewsPost() {

  // Dynamic Routing
  const params = useParams();
  // params.id => dynamic value defined as id in route ('/news/1234' -> params.id equals 1234)
  
  const id = params.id;
  const post = usePost(id);

  const maxNumberOfPosts = 6;
  const featuredPosts = usePosts(maxNumberOfPosts);

  return (
    <div className='body-bg'>
      
      <Header currentPage={"news"}/>

      <div className="container-sm p-3">

        <div className="row g-5">

          {/* NEWS POST CONTENT */}
          <div className="col-lg-9">
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
          <div className="col-lg-3">
            <div className="position-sticky">
              <h1 className="mb-2">Weitere Beiträge</h1>
              <ul className="list-unstyled">
                {!featuredPosts ? <LoadingSpinner/> :
                  <li>
                    {featuredPosts.map((post) => (
                      <Link to={'/news/'+post.id} className="d-flex flex-column flex-sm-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-bottom">
                        <img className="col d-none d-sm-block test-img rounded" src={post.attributes.titleimage?.data?.attributes?.url ? STRAPI_CMS_URL + post.attributes.titleimage.data.attributes.url : defaultImg} alt=""/>
                        <div className="col-sm-8">
                          <h6 className="mb-0">{post.attributes.title}</h6>
                          <small className="text-body-secondary">{formatPublishedAt(post.attributes.publishedAt)}</small>
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