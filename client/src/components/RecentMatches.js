// client/src/components/RecentMatches.js

import React from "react";
import { STRAPI_CMS_URL, formatDateShort } from '../utils/Utils.js';
import { Link } from "react-router-dom";

function RecentMatches({ matches }) {

  function isAdelbergHomeTeam(selectedMatch) {
    return selectedMatch.attributes.teamHome.data.attributes.name === "Eisbuaba Adelberg";
  }
  function getOpponentTeamLogoPath(selectedMatch) {
    const opponentLogoPath = isAdelbergHomeTeam(selectedMatch) ? STRAPI_CMS_URL + selectedMatch.attributes.teamAway.data.attributes.logo.data.attributes.url : STRAPI_CMS_URL + selectedMatch.attributes.teamHome.data.attributes.logo.data.attributes.url;
    return opponentLogoPath;
  }
  function haveEisbuabaWon(selectedMatch) {
    const adelbergScore = isAdelbergHomeTeam(selectedMatch) ? selectedMatch.attributes.goalsHome : selectedMatch.attributes.goalsAway;
    const opponentScore = !isAdelbergHomeTeam(selectedMatch) ? selectedMatch.attributes.goalsHome : selectedMatch.attributes.goalsAway;
    return adelbergScore > opponentScore;
  }

  return (
    <>
      <div className="hstack justify-content-between">
        <h1 className="mb-2">Vergangene Spiele</h1>
        <Link className="icon-link gap-1 icon-link-hover pb-1" to={"/termine"}>Alle Spiele<i className="bi bi-chevron-right"></i></Link>
      </div>

      <div className="row justify-content-center g-3 g-sm-5">
        {matches.map((match, index) => (
          <div className="col-auto text-center" key={index}>
            <div className="vstack">
              <p className="opacity-75">{formatDateShort(match.attributes.faceoffTime.slice(0,10))}</p>
              <img className="team-logo-circle mx-auto my-3" src={getOpponentTeamLogoPath(match)} alt='Opponent Team Logo'/>
              {match.attributes.hasFinished ?
                <h1 className="bg-dark text-light rounded rounded-bottom-0 p-2"><span className={isAdelbergHomeTeam(match) && 'fw-bold'}>{match.attributes.goalsHome}</span> : <span className={!isAdelbergHomeTeam(match) && 'fw-bold'}>{match.attributes.goalsAway}</span></h1>
                 : <h1>vs.</h1>}
              {match.attributes.hasFinished ? (haveEisbuabaWon(match) ? <span className="badge rounded-top-0 bg-success">W</span> : <span className="badge rounded-top-0 bg-danger">L</span>) : <span className="badge bg-warning">?</span>}
            </div>
          </div>
        ))}
      </div>
    </>
  )

}

export default RecentMatches