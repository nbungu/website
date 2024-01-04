// client/src/components/NewsTile.js

import React from 'react';
import { Link } from 'react-router-dom';
import { formatPublishedAt, STRAPI_CMS_URL } from '../utils/Utils';

import defaultImg from '../assets/default-image.webp'

function NewsTile({ newsPost }) {
  
  const imgPath = newsPost.attributes.titleimage?.data && STRAPI_CMS_URL + newsPost.attributes.titleimage.data.attributes.url;

  return (
    <Link className='news-tile bg-light rounded border shadow' to={`/news/${newsPost.id}`} key={newsPost.attributes.title}> 
      {/* IMAGE */}
      <div className='news-tile-image'>
        <span class="badge bg-light text-dark">{newsPost.attributes.type}</span>
        {newsPost.attributes.youtubeurl && <i class="bi bi-youtube"/>}
        <img className='rounded rounded-bottom-0' src={imgPath ? imgPath : defaultImg} alt={`News Post ${newsPost.id} Cover`}/>
      </div>
      {/* CONTENT */}
      <div className='p-3 pt-2'>
        <p className='opacity-75'>{formatPublishedAt(newsPost.attributes.publishedAt)}</p>
        <h1 className='mt-2'>{newsPost.attributes.title}</h1>
        <p className='news-tile-desc mt-2'>{newsPost.attributes.summary}</p>
      </div>          
    </Link>
  )
}

export default NewsTile