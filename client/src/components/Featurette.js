// client/src/components/FeaturetteTeaser.js

import React from 'react';
import { Link } from 'react-router-dom';
import { formatPublishedAt, replaceSpacesWithHyphen, STRAPI_CMS_URL } from '../utils/Utils';

function FeaturetteTeaser({ featuredNewsPost, onPostClicked }) {  
  
  const imgRelPath = featuredNewsPost.attributes.titleimage?.data?.attributes.url;
  const imgPath = STRAPI_CMS_URL + featuredNewsPost.attributes.titleimage?.data?.attributes.url;

  return (
    <div className='featurette mt-3'>

      <Link className="row mx-auto text-decoration-none border border-bottom-0 border-light rounded p-3" to={`/news/${featuredNewsPost.id}`} onClick={()=>{onPostClicked(featuredNewsPost.id)}} key={featuredNewsPost.attributes.title}>
        <p>{formatPublishedAt(featuredNewsPost.attributes.publishedAt)}</p>
        <h1>{featuredNewsPost.attributes.title}</h1>
        <div className='clearfix'>
          <img src={imgPath} class="featurette-image rounded col-sm-6 float-md-end ms-md-3 mt-3" alt="..."/>
          <p className='mt-3'>{featuredNewsPost.attributes.summary}</p>
        </div>
      </Link>

    </div>
  )
}

export default FeaturetteTeaser

/**


<Link className="row mx-auto text-decoration-none border border-bottom-0 border-dark-subtle rounded p-3" to={`/news/${replaceSpacesWithHyphen(featuredNewsPost.attributes.title)}`} onClick={()=>{onPostClicked(featuredNewsPost.id)}} key={featuredNewsPost.attributes.title}>
        <div className={imgRelPath ? "col-md-7 ps-0 pe-2" : "col-md-12 p-0"}>
          <h1>{featuredNewsPost.attributes.title}</h1>
          <p className='pt-2'>{formatPublishedAt(featuredNewsPost.attributes.publishedAt)}</p>
          <p className='py-2'>{featuredNewsPost.attributes.summary}</p>
        </div>
        {imgRelPath ?
          <div className="col-md-5 p-0">
            <img src={imgPath} className='featurette-image rounded img-fluid mx-auto' alt=''/> 
          </div> : <div/>
        }
      </Link>

*/