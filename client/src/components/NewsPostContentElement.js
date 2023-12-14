// client/src/components/NewsPostContentElement.js

import React from "react";
import YouTubeEmbed from "./YouTubeEmbed";
import ImageGallery from "./ImageGallery";
import { STRAPI_CMS_URL } from '../utils/Utils';

function NewsPostContentElement({ newsPost }) {
  
  const imgPathRel = newsPost.attributes.titleimage?.data?.attributes.url;
  const imgPath = STRAPI_CMS_URL + imgPathRel;
  const imageCaption = newsPost.attributes.titleimagecaption;
  const textBlocks = getTextBlocks(newsPost.attributes.fulltext)
  const imgCollection = getImageArray(newsPost.attributes.imagecollection)
  const ytVideoUrl = newsPost.attributes.youtubeurl;
  
  // returns an array containing only the textblocks from the fullText Array of the JSON
  function getTextBlocks(fullTextArray) {
    return fullTextArray?.map(item => item.children[0].text);
  }
  function getImageArray(imageCollection) {
    return imageCollection?.data?.map(item => STRAPI_CMS_URL + item.attributes.url);
  }

  return (
    <div className="container-flex">
      {imgPathRel ? <img className="img-fluid news-post-image rounded mt-2" src={imgPath} alt=''/> : <div className="m-0 p-0"/>}
      {imgPathRel && imageCaption ? <p className="my-2 text-body-secondary">{imageCaption}</p> : <div className="m-0 p-0"/>}
      {textBlocks && textBlocks.map((textBlock) => (<p className="text-start mt-3">{textBlock}</p>))}
      {imgCollection && <div className="mt-3"><ImageGallery imagePaths={imgCollection}/></div>}
      {ytVideoUrl && <div className="mt-3"><YouTubeEmbed videoUrl={ytVideoUrl}/></div>}
    </div>
  )
}

export default NewsPostContentElement