// client/src/components/FeaturetteTeaser.js

import React from 'react';
import { Link } from 'react-router-dom';
import { formatPublishedAt, STRAPI_CMS_URL } from '../utils/Utils';
import defaultImg from '../assets/default-image.png'


function FeaturetteTeaser({ featuredNewsPost, onPostClicked }) {  
  
  const imgPathRel = featuredNewsPost.attributes.titleimage?.data?.attributes.url;
  const img = STRAPI_CMS_URL + imgPathRel;

  return (
    <div className='featurette mt-3'>

      <Link className="row mx-auto text-decoration-none border border-bottom-0 border-light rounded p-3" to={`/news/${featuredNewsPost.id}`} onClick={()=>{onPostClicked(featuredNewsPost.id)}} key={featuredNewsPost.attributes.title}>
        <p>{formatPublishedAt(featuredNewsPost.attributes.publishedAt)}</p>
        <h1>{featuredNewsPost.attributes.title}</h1>
        <div className='clearfix'>
          <img src={imgPathRel ? img : defaultImg} className="featurette-image rounded col-sm-6 float-md-end ms-md-3 mt-3" alt="..."/>
          <p className='mt-3'>{featuredNewsPost.attributes.summary}</p>
        </div>
      </Link>

    </div>
  )
}

export default FeaturetteTeaser