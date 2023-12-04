// client/src/components/NewsPostEndingElement.js

import React from "react";
import { Link } from 'react-router-dom';
import NewsList from "./NewsList";

function NewsPostEndingElement() {
  
  return (
    
    <div className="tile-container">
      
      <div className="fixed-tile">
        <h2>Weitere Artikel</h2>
        <NewsList/>
      </div>

      <div className="row justify-content-between mt-3">
        <div className="col-auto">
          <Link className='btn btn-light' to="/news"><i className="bi bi-arrow-left pe-2"/>Alle News</Link>
        </div>
      </div>

    </div>

  )
}

export default NewsPostEndingElement