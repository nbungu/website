// client/src/components/NewsTile.js

import React from 'react';
import { Link } from 'react-router-dom';
import { formatPublishedAt, replaceSpacesWithHyphen, STRAPI_CMS_URL } from '../utils/Utils';


function NewsTile({ newsPost, onPostClicked }) {
  
  const imgRelPath = newsPost.attributes.titleimage.data?.attributes.url;
  const imgPath = STRAPI_CMS_URL + newsPost.attributes.titleimage.data?.attributes.url;
  const defaultImg = STRAPI_CMS_URL + "/uploads/ice_rink_698cada73b.png"
  const hasYTVideo = newsPost.attributes.youtubeurl;

  return (
    <Link className='news-tile' to={`/news/${replaceSpacesWithHyphen(newsPost.attributes.title)}`} onClick={()=>{onPostClicked(newsPost.id)}} key={newsPost.attributes.title}> 
      <div className='news-tile-image'>
        {hasYTVideo ? <i class="bi bi-youtube"/> : <div/>}
        <img class="news-tile-cover" src={imgRelPath ? imgPath : defaultImg} alt='cover'/>
      </div>      
      <span class="badge bg-secondary">{formatPublishedAt(newsPost.attributes.publishedAt)}</span>
      <h2>{newsPost.attributes.title}</h2>
      <p className='news-tile-desc'>{newsPost.attributes.summary}</p>
      <i class="bi bi-arrow-right fs-5"/>
    </Link>
  )
}

export default NewsTile

/*


<div id='badgerow' className='row justify-content-end m-0 pb-2 w-100 gap-2 z-1'>
        <div class="col-auto badge bg-secondary"><i class="bi bi-youtube fs-2"></i></div>
        <div class="col-auto badge bg-secondary"><i class="bi bi-youtube fs-2"></i></div>
      </div>
      <img className='news-tile-cover' src={imgRelPath ? imgPath : defaultImg} alt='cover'/>

      <div className='img-test'>
        <i class="bi bi-youtube fs-2"></i>
        <img class="news-tile-cover" src={imgRelPath ? imgPath : defaultImg} alt='cover'/>
      </div>


    // OG:
    <Link className='news-tile' to={`/news/${replaceSpacesWithHyphen(newsPost.attributes.title)}`} onClick={()=>{onPostClicked(newsPost.id)}} key={newsPost.attributes.title}> 
      <img className='news-tile-cover' src={imgRelPath ? imgPath : defaultImg} alt='cover'/>
      <span class="badge bg-secondary">{formatPublishedAt(newsPost.attributes.publishedAt)}</span>
      <h2 className='bg-success'>{newsPost.attributes.title}</h2>
      <p className='news-tile-desc bg-info'>{newsPost.attributes.summary}</p>
      <footer className='bg-info'>
        <div className='news-tile-link bg-success'>➝</div>
      </footer>
    </Link>
*/