// client/src/components/NewsPostContentElement.js

import React, { useState, useEffect } from "react";

import YouTubeEmbed from "./YouTubeEmbed";
import ImageGallery from "./ImageGallery";
import EventList from "./EventList";
import MatchList from "./MatchList";

import { STRAPI_CMS_URL } from '../utils/Utils';
import RichTextBlocks from "./RichTextBlocks";

function NewsPostContentElement({ newsPost }) {
  
  const [linkedEvent, setLinkedEvent] = useState(null);
  const [linkedMatch, setLinkedMatch] = useState(null);

  const imgPathRel = newsPost.attributes.titleimage?.data?.attributes.url;
  const imgPath = STRAPI_CMS_URL + imgPathRel;
  const imageCaption = newsPost.attributes.titleimagecaption;
  const fullText = newsPost.attributes.fulltext;
  const imgCollection = getImageArray(newsPost.attributes.imagecollection);
  const ytVideoUrl = newsPost.attributes.youtubeurl;
  const linkedEventId = newsPost.attributes.event?.data?.id;
  const linkedMatchId = newsPost.attributes.match?.data?.id;

  const queryString = STRAPI_CMS_URL + "/api/matches/"+ linkedMatchId +"?populate[teamHome][populate][0]=logo&populate[teamAway][populate][0]=logo";
  const queryString2 = STRAPI_CMS_URL + "/api/events/"+ linkedEventId +"?populate=*";
  
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
      .then((result) => setLinkedMatch([result.data]))
      .catch((error) => {
        console.error('Error fetching matches:', error);
        // You can handle the error here, such as displaying an error message to the user
      });
  };
  const fetchLinkedEvent = () => {
    return fetch(queryString2)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => setLinkedEvent([result.data]))
      .catch((error) => {
        console.error('Error fetching matches:', error);
        // You can handle the error here, such as displaying an error message to the user
      });
  };

  useEffect(() => {
    setLinkedEvent(null);
    setLinkedMatch(null);
    linkedEventId && fetchLinkedEvent();
    linkedMatchId && fetchLinkedMatch();
  }, [newsPost]);

  return (
    <div className="container-flex">
      {linkedEvent && <div className="mt-3"><EventList events={linkedEvent}/></div>}
      {linkedMatch && <div className="mt-3"><MatchList matches={linkedMatch}/></div>}
      {imgPathRel && <img className="img-fluid news-post-image rounded mt-3" src={imgPath} alt=''/>}
      {imgPathRel && imageCaption && <p className="text-body-secondary mt-2">{imageCaption}</p>}
      {fullText && <div className="mt-3"><RichTextBlocks richtext={fullText}/></div>}
      {imgCollection && <div className="mt-3"><ImageGallery imagePaths={imgCollection}/></div>}
      {ytVideoUrl && <div className="mt-3"><YouTubeEmbed videoUrl={ytVideoUrl}/></div>}
    </div>
  )
}

export default NewsPostContentElement