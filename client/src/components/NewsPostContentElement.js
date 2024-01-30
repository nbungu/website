// client/src/components/NewsPostContentElement.js

import React, { useState, useEffect } from "react";

import YouTubeEmbed from "./YouTubeEmbed";
import ImageGallery from "./ImageGallery";

import { STRAPI_CMS_URL } from '../utils/Utils';
import RichTextBlocks from "./RichTextBlocks";
import MatchListEntry from "./MatchListEntry";

function NewsPostContentElement({ newsPost }) {
  
  const [linkedMatch, setLinkedMatch] = useState(null);

  const imgPathRel = newsPost.attributes.titleimage?.data?.attributes.url;
  const imgPath = STRAPI_CMS_URL + imgPathRel;
  const imageCaption = newsPost.attributes.titleimagecaption;
  const fullText = newsPost.attributes.fulltext;
  const imgCollection = getImageArray(newsPost.attributes.imagecollection);
  const ytVideoUrl = newsPost.attributes.youtubeurl;
  const linkedMatchId = newsPost.attributes.match?.data?.id;

  const queryString = STRAPI_CMS_URL + "/api/matches/"+ linkedMatchId +"?populate[teamHome][populate][0]=logo&populate[teamAway][populate][0]=logo";
  
  // returns an array containing only the textblocks from the fullText Array of the JSON
  function getImageArray(imageCollection) {
    return imageCollection?.data?.map(item => STRAPI_CMS_URL + item.attributes.url);
  }

  const fetchLinkedMatch = () => {
    return fetch(queryString)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => setLinkedMatch(result.data))
      .catch((error) => {
        console.error('Error fetching matches:', error);
        // You can handle the error here, such as displaying an error message to the user
      });
  };  

  useEffect(() => {
    setLinkedMatch(null);
    linkedMatchId && fetchLinkedMatch();
  }, [newsPost]);

  return (
    <div className="container-flex">
      {linkedMatch && <div className="mt-3 list-group w-100"><MatchListEntry match={linkedMatch}/></div>}
      {imgPathRel && <img className="img-fluid news-post-image rounded mt-3" src={imgPath} alt=''/>}
      {imgPathRel && imageCaption && <p className="text-body-secondary mt-2">{imageCaption}</p>}
      {fullText && <div className="mt-3"><RichTextBlocks richtext={fullText}/></div>}
      {imgCollection && <h1 className="text-start mb-2 mt-3">{'Gallerie ('+imgCollection.length+')'}</h1>}
      {imgCollection && <div className="mt-3"><ImageGallery imagePaths={imgCollection}/></div>}
      {ytVideoUrl && <div className="mt-3"><YouTubeEmbed videoUrl={ytVideoUrl}/></div>}
    </div>
  )
}

export default NewsPostContentElement