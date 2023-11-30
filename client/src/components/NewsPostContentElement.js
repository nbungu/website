// client/src/components/NewsPostContentElement.js

import React from "react";
import ImageCarousel from "./ImageCarousel";
import { STRAPI_CMS_URL } from '../utils/Utils';
import YouTubeEmbed from "./YouTubeEmbed";

function NewsPostContentElement({ newsPost }) {
  
  const imgRelPath = newsPost.attributes.titleimage?.data?.attributes.url;
  const imgPath = STRAPI_CMS_URL + newsPost.attributes.titleimage?.data?.attributes.url;
  const imageCaption = newsPost.attributes.titleimagecaption;
  const textBlocks = getTextBlocks(newsPost.attributes.fulltext)
  const imgCollection = getImageArray(newsPost.attributes.imagecollection)
  const youtTubeVideoUrl = newsPost.attributes.youtubeurl;
  
  // returns an array containing only the textblocks from the fullText Array of the JSON
  function getTextBlocks(fullTextArray) {
    return fullTextArray?.map(item => item.children[0].text);
  }
  function getImageArray(imageCollection) {
    return imageCollection?.data?.map(item => STRAPI_CMS_URL + item.attributes.url);
  }

  return (
    <div className="container-flex">
      {imgRelPath ? <img className="img-fluid news-post-image rounded mt-2" src={imgPath} alt=''/> : <img className="m-0 p-0" alt=''/>}
      {imgRelPath && imageCaption ? <p className="my-2 text-body-secondary">{imageCaption}</p> : <p className="m-0 p-0"></p>}
      {textBlocks ? textBlocks.map((textBlock) => (<p className="text-start mt-3">{textBlock}</p>)) : <p/>}
      {imgCollection ? <div className="mt-3"><ImageCarousel imagePaths={imgCollection}/></div> : <p/>}
      {youtTubeVideoUrl ? <div className="mt-3"><YouTubeEmbed videoUrl={youtTubeVideoUrl}/></div> : <p/>}
    </div>
  )
}

export default NewsPostContentElement