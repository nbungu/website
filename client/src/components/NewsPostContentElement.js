// client/src/components/NewsPostContentElement.js

import React from "react";
import YouTubeEmbed from "./YouTubeEmbed";
import ImageGallery from "./ImageGallery";
import { STRAPI_CMS_URL } from '../utils/Utils';

function NewsPostContentElement({ newsPost }) {
  
  const imgPathRel = newsPost.attributes.titleimage?.data?.attributes.url;
  const imgPath = STRAPI_CMS_URL + imgPathRel;
  const imageCaption = newsPost.attributes.titleimagecaption;
  const paragraphs = getParagraphs(newsPost.attributes.fulltext)
  const imgCollection = getImageArray(newsPost.attributes.imagecollection)
  const ytVideoUrl = newsPost.attributes.youtubeurl;
  
  // returns an array containing only the textblocks from the fullText Array of the JSON
  function getParagraphs(fullTextArray) {
    return fullTextArray?.map(item => item.children); // Children itself is also an array!
  }
  function getImageArray(imageCollection) {
    return imageCollection?.data?.map(item => STRAPI_CMS_URL + item.attributes.url);
  }

  return (
    <div className="container-flex">  
      {imgPathRel ? <img className="img-fluid news-post-image rounded mt-2" src={imgPath} alt=''/> : <div className="m-0 p-0"/>}
      {imgPathRel && imageCaption ? <p className="my-2 text-body-secondary">{imageCaption}</p> : <div className="m-0 p-0"/>}
      {paragraphs && paragraphs.map((child) => (
        <p className="text-start mt-3">
          {child.map(e => <span class={`${e.bold && 'fw-bold'} ${e.italic && 'fst-italic'}`}>{e.text}</span>)}
        </p>
      ))}
      {imgCollection && <div className="mt-5"><ImageGallery imagePaths={imgCollection}/></div>}
      {ytVideoUrl && <div className="mt-5"><YouTubeEmbed videoUrl={ytVideoUrl}/></div>}
    </div>
  )
}

export default NewsPostContentElement