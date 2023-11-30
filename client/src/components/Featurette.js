// client/src/components/FeaturetteTeaser.js

import React from 'react';
import { Link } from 'react-router-dom';
import { formatPublishedAt, replaceSpacesWithHyphen, STRAPI_CMS_URL } from '../utils/Utils';

function FeaturetteTeaser({ featuredNewsPost, onPostClicked }) {  
  
  const imgRelPath = featuredNewsPost.attributes.titleimage?.data?.attributes.url;
  const imgPath = STRAPI_CMS_URL + featuredNewsPost.attributes.titleimage?.data?.attributes.url;

  return (
    <div>
      <Link className="row featurette mx-auto text-decoration-none border-top border-secondary mt-4" to={`/news/${replaceSpacesWithHyphen(featuredNewsPost.attributes.title)}`} onClick={()=>{onPostClicked(featuredNewsPost.id)}} key={featuredNewsPost.attributes.title}>
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
    </div>
  )
}

export default FeaturetteTeaser

/**
 * 
 * 
<svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>default title</title><rect width="100%" height="100%" fill="var(--bs-secondary-bg)"></rect><text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em">500x500</text></svg>
 */