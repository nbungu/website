// client/src/components/NewsPostStartingElement.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { STRAPI_CMS_URL } from '../utils/Utils';

function NewsPostStartingElement({ newsPostUpVotes, newsPostDownVotes, postId }) {
  
  const [thumbsUpCount, setThumbsUpCount] = useState(newsPostUpVotes);
  const [thumbsDownCount, setThumbsDownCount] = useState(newsPostDownVotes);
  const [votedUp, setVotedUp] = useState(false);
  const [votedDown, setVotedDown] = useState(false);

  const handleThumbsUpClick = () => {
    if (!votedUp && !votedDown) {
      setThumbsUpCount(thumbsUpCount + 1);
      setVotedUp(true);
    } else if (votedUp) {
      setThumbsUpCount(thumbsUpCount - 1);
      setVotedUp(false);
    }
  };

  const handleThumbsDownClick = () => {
    if (!votedDown && !votedUp) {
      setThumbsDownCount(thumbsDownCount + 1);
      setVotedDown(true);

    } else if (votedDown) {
      setThumbsDownCount(thumbsDownCount - 1);
      setVotedDown(false);
    }
  };

  useEffect(() => {
    // PUT request using fetch with async/await
    async function updatePost() {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "data": {
                  "upvotes": thumbsUpCount,
                  "downvotes": thumbsDownCount
              }
          })
        };
        const response = await fetch(STRAPI_CMS_URL + '/api/posts/' + postId, requestOptions);
        const data = await response.json();
        //setPostId(data.id);
    }
    updatePost();
}, [thumbsUpCount, thumbsDownCount]);


  return (
    <div className="row justify-content-between">

      <div className="col-auto">
        <Link className='btn btn-light' to="/news"><i className="bi bi-arrow-left pe-2"/>Zur Übersicht</Link>
      </div>

      <div className="col-auto">
        <div class="btn-group" role="group" aria-label="Basic outlined">
          <button type="button" class='btn btn-success' onClick={handleThumbsUpClick}><i className="bi bi-hand-thumbs-up pe-2"/>{thumbsUpCount}</button>
          <button type="button" class='btn btn-light' onClick={handleThumbsDownClick}><i className="bi bi-hand-thumbs-down pe-2"/>{thumbsDownCount}</button>
        </div>
      </div>

    </div>
  )
}

export default NewsPostStartingElement

/**

    <div className="row">

      <div className="d-grid gap-2 d-md-flex justify-content-md-end">

        <div class="btn-group" role="group" aria-label="Basic outlined">
          <button type="button" class='btn btn-success' onClick={handleThumbsUpClick}><i className="bi bi-hand-thumbs-up pe-2"/>{thumbsUpCount}</button>
          <button type="button" class='btn btn-light' onClick={handleThumbsDownClick}><i className="bi bi-hand-thumbs-down pe-2"/>{thumbsDownCount}</button>
        </div>

      </div>

    </div>


      <div className="d-grid gap-2 d-md-flex justify-content-md-start">
 
        <button type="button" class='btn btn-light' onClick={handleThumbsDownClick}><i className="bi bi-hand-thumbs-down pe-2"/>{thumbsDownCount}</button>


      </div>
 */