// client/src/components/NewsTile.js

import React from 'react';
import { Link } from 'react-router-dom';
import { formatPublishedAt, STRAPI_CMS_URL } from '../utils/Utils';

import defaultImg from '../assets/default-image.webp'

function NewsTile({ newsPost }) {
  
  const imgPath = newsPost.attributes.titleimage?.data && STRAPI_CMS_URL + newsPost.attributes.titleimage.data.attributes.url;

  return (
    <Link className='news-tile rounded border-bottom' to={`/news/${newsPost.id}`} key={newsPost.attributes.title}> 
      <span class="badge rounded-bottom-0 bg-secondary-subtle text-dark">{newsPost.attributes.type}</span>
      <div className='news-tile-image'>
        {newsPost.attributes.youtubeurl && <i class="bi bi-youtube"/>}
        <img class="news-tile-cover" src={imgPath ? imgPath : defaultImg} alt='cover'/>
      </div>
      <p className='my-1 opacity-75'>{formatPublishedAt(newsPost.attributes.publishedAt)}</p>
      <h1>{newsPost.attributes.title}</h1>
      <p className='news-tile-desc mt-2 mb-3'>{newsPost.attributes.summary}</p>      
    </Link>
  )
}

export default NewsTile