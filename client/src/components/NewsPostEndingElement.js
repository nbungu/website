// client/src/components/NewsPostEndingElement.js

import React from "react";

function NewsPostEndingElement({ author, releaseDate }) {
  
  return (
    <div className="container-flex">
      <img className="w-100 mt-3" src={image} alt='image caption'/>
      <p className="lead my-3">{imageCaption}</p>
    </div>
  )
}

export default NewsPostEndingElement