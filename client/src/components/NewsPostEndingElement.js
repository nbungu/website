// client/src/components/NewsPostEndingElement.js

import React from "react";
import { Link } from 'react-router-dom';
import ButtonTile from "./ButtonTile";

function NewsPostEndingElement({ previousPostId, nextPostId }) {
  
  return (
    <div className="container-fluid">
      <div className="tiles-container-flex col2">

        <ButtonTile link={"/news"} icon={"bi bi-newspaper"} header={"News"} text={"Aktuelle Beiträge vom Verein, Spielberichte etc."}/>
        <ButtonTile link={"/termine"} icon={"bi bi-calendar2-week-fill"} header={"Termine"} text={"Aktuelle Trainingszeiten, Spiele & Veranstaltungen"}/>
        
      </div>
    </div>
  )
}

export default NewsPostEndingElement