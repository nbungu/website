// client/src/components/NewsPostEndingElement.js

import React from "react";
import { Link } from 'react-router-dom';
import ButtonTile from "./ButtonTile";

function NewsPostEndingElement({ previousPostId, nextPostId }) {
  
  return (
    <div className="row justify-content-between">

      <div className="col-auto">
        <Link className='btn btn-light' to="/news"><i className="bi bi-arrow-left pe-2"/>Vorheriger Artikel</Link>
      </div>

      <div className="col-auto">
        <Link className='btn btn-light' to="/news">Nächster Artikel<i className="bi bi-arrow-right ps-2"/></Link>
      </div>

    </div>
  )
}

export default NewsPostEndingElement