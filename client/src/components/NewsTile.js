// client/src/components/NewsTile.js

import React from 'react';
import { Link } from 'react-router-dom';
import { formatPublishedAt, STRAPI_CMS_URL } from '../utils/Utils';

import defaultImg from '../assets/default-image.webp'

function NewsTile({ newsPost }) {
  
  const imgPath = newsPost.attributes.titleimage?.data && STRAPI_CMS_URL + newsPost.attributes.titleimage.data.attributes.url;

  return (
    <Link className='news-tile border-bottom' to={`/news/${newsPost.id}`} key={newsPost.attributes.title}> 
      <span class="badge rounded-bottom-0 bg-secondary-subtle text-dark">
        <div className='hstack justify-content-between'>
          <p className='opacity-75 lead'>{formatPublishedAt(newsPost.attributes.publishedAt)}</p>
          <p className='opacity-75 fw-normal'>{newsPost.attributes.type}</p>
        </div>
      </span>
      <div className='news-tile-image'>
        {newsPost.attributes.youtubeurl && <i class="bi bi-youtube"/>}
        <img class="rounded rounded-top-0" src={imgPath ? imgPath : defaultImg} alt='cover'/>
      </div>
      <h1 className='my-2'>{newsPost.attributes.title}</h1>
      <p className='news-tile-desc mb-3'>{newsPost.attributes.summary}</p>      
    </Link>
  )
}

export default NewsTile