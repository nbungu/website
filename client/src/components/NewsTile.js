// client/src/components/NewsTile.js

import React from 'react';
import { Link } from 'react-router-dom';
import { formatPublishedAt, STRAPI_CMS_URL } from '../utils/Utils';

import defaultImg from '../assets/default-image.png'

function NewsTile({ newsPost, onPostClicked }) {
  
  const imgPathRel = newsPost.attributes.titleimage.data?.attributes.url;
  const img = STRAPI_CMS_URL + imgPathRel;

  return (
    <Link className='news-tile' to={`/news/${newsPost.id}`} onClick={()=>{onPostClicked(newsPost.id)}} key={newsPost.attributes.title}> 
      <div className='news-tile-image'>
        {newsPost.attributes.youtubeurl && <i class="bi bi-youtube"/>}
        <img class="news-tile-cover" src={imgPathRel ? img : defaultImg} alt='cover'/>
      </div>
      <span class="badge bg-secondary">{formatPublishedAt(newsPost.attributes.publishedAt)}</span>
      <h2>{newsPost.attributes.title}</h2>
      
      <p className='news-tile-desc'>{newsPost.attributes.summary}</p>
      <i class="bi bi-arrow-right fs-5"/>
    </Link>
  )
}

export default NewsTile