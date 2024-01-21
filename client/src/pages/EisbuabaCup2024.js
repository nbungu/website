// client/src/pages/EisbuabaCup2024.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import MatchList from "../components/MatchList.js";
import ProgressBar from "../components/ProgressBar.js";

import { STRAPI_CMS_URL } from '../utils/Utils.js';
import defaultImg from '../assets/default-image.webp'

function EisbuabaCup2024() {
    // fetches the last two most recent posts in sorted order
    const queryString1 = STRAPI_CMS_URL + "/api/eisbuaba-cup-page?populate=*";
    const queryString2 = STRAPI_CMS_URL + "/api/teams?filters[isEisbuabacupTeam][$eq]=true&populate=*";
    const queryString3 = STRAPI_CMS_URL + "/api/matches?filters[matchtype][$eq]=Eisbuaba-Cup&populate[teamHome][populate][0]=logo&populate[teamAway][populate][0]=logo&sort=faceoffTime";
    const queryString4 = STRAPI_CMS_URL + "/api/teams?fields[0]=votingCount&sort[0]=votingCount:desc&pagination[start]=0&pagination[limit]=1"
    
    const [pageContent, setPageContent] = useState(null);
    const [teams, setTeams] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [vorrundenMatches, setVorrundenMatches] = useState(null);
    const [playoffMatches, setPlayoffMatches] = useState(null);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [selectedTeamVotingCount, setSelectedTeamVotingCount] = useState(null);
    const [highestVoting, setHighestVoting] = useState(0);

    const handleRadioChange = (teamId, currentVotingCount) => {
      setSelectedTeamId(teamId);
      setSelectedTeamVotingCount(currentVotingCount);
    };

    const handleVoteButtonClick = () => {
      if (selectedTeamId) {
        // PUT request using fetch with async/await
        async function updateTeamVote() {
          const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                  "data": {
                      "votingCount": selectedTeamVotingCount + 1
                  }
                } 
            )
          };
          const response = await fetch(STRAPI_CMS_URL + '/api/teams/' + selectedTeamId, requestOptions);
          const data = await response.json();

          await fetchActiveTeams();
          await fetchHighestVoting();
        }
        updateTeamVote();
        setHasVoted(true);
        // reset selected
        setSelectedTeamId(null);
        setSelectedTeamVotingCount(null);
        // Update list entries
      }
    };
  
    const fetchPageContent = () => {
      return fetch(queryString1)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => setPageContent(result.data))
        .catch((error) => {
          console.error('Error fetching events:', error);
          // You can handle the error here, such as displaying an error message to the user
        });
    };
    const fetchActiveTeams = () => {
      return fetch(queryString2)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => setTeams(result.data))
        .catch((error) => {
          console.error('Error fetching teams:', error);
          // You can handle the error here, such as displaying an error message to the user
        });
    };
    const fetchHighestVoting = () => {
      return fetch(queryString4)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => setHighestVoting(result.data[0].attributes.votingCount || 0))
        .catch((error) => {
          console.error('Error fetching votes:', error);
          // You can handle the error here, such as displaying an error message to the user
        });
    };
    const fetchCupMatches = () => {
      return fetch(queryString3)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => {
          const vorrundenMatches = result.data.filter(obj => obj.attributes.infotext === 'Vorrundenspiel');
          const playoffMatches = result.data.filter(obj => obj.attributes.infotext === 'Playoffspiel');
          setVorrundenMatches(vorrundenMatches);
          setPlayoffMatches(playoffMatches);
        })
        .catch((error) => {
          console.error('Error fetching matches:', error);
          // You can handle the error here, such as displaying an error message to the user
        });
    };

    // We want fetchXY() etc. to be executed everytime App component loads
    useEffect(() => {
      fetchPageContent();
      fetchActiveTeams();
      fetchCupMatches();
      fetchHighestVoting();
      document.title = "Eisbuaba Cup 2024 > Eisbuaba Adelberg";
    }, []);

  return (
    <div className='body-bg'>

      <Header currentPage={null}/>

      <div className='flex-grow-1'>

        {/* FULL WIDTH JUMBOTRON */}
        <div className="bg-secondary">
            <div className="text-center p-4">
                  {!pageContent ? <LoadingSpinner message={"Lade Content..."}/> : 
                  <div className="container">
                    <img className='bi p-2' width={200} height={200} src={STRAPI_CMS_URL + pageContent.attributes.logo.data.attributes.url} alt="Eisbuaba-Cup Logo"/>
                    <h1 className="text-light p-1">{pageContent.attributes.title}</h1>
                    <p className="col-lg-8 mx-auto lead text-light p-1">{pageContent.attributes.summary}</p>
                  </div>
                  }
            </div>
        </div>

        {/* TEAMS */}
        <div className="bg-light shadow">
          <div className="container">
            <div className="row w-100 g-0">
            {!teams ? <LoadingSpinner message={"Lade Teams..."}/> :
                    teams.length === 0 ? <p>Teilnehmende Teams werden in Kürze bekannt gegeben...</p> :
                    teams.map((team) => (
                      <div className="col-6 col-md-3 p-3 p-md-2">
                        <div className="row g-0 gap-2 align-items-top">
                          <div className="col-auto mx-auto mx-sm-start">
                            <img className="team-logo-circle rounded-3 bg-light p-1" src={!team.attributes.logo.data ? defaultImg : (STRAPI_CMS_URL + team.attributes.logo.data.attributes.url)} width={40} height={40} alt="Team Logo"/>
                          </div>
                          <div className="col-12 col-sm my-auto text-sm-start text-center">
                            <h3>{team.attributes.name}</h3>
                          </div>
                        </div>                       
                      </div>
                    ))
                  }
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="container px-3 py-5" id="hanging-icons">
            <div className="row g-4 row-cols-1 row-cols-lg-3">
              <div className="col d-flex align-items-start">
                  <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center flex-shrink-0 me-3">
                    <i className="bi bi-clock fs-1"></i>
                  </div>
                  {!pageContent ? <LoadingSpinner message={"Lade Content..."}/> : 
                    <div>
                      <h1 className="text-body-emphasis my-2">{pageContent.attributes.descriptionHeader1}</h1>
                      <p>{pageContent.attributes.description1}</p>
                    </div>
                  }
              </div>
              <div className="col d-flex align-items-start">
                  <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center flex-shrink-0 me-3">
                    <i className="bi bi-pencil-square fs-1"></i>
                  </div>
                  {!pageContent ? <LoadingSpinner message={"Lade Content..."}/> : 
                    <div>
                      <h1 className="text-body-emphasis my-2">{pageContent.attributes.descriptionHeader2}</h1>
                      <p>{pageContent.attributes.description2}</p>
                    </div>
                  }
              </div>
              <div className="col d-flex align-items-start">
                  <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center flex-shrink-0 me-3">
                    <i className="bi bi-crosshair fs-1"></i>
                  </div>
                  {!pageContent ? <LoadingSpinner message={"Lade Content..."}/> : 
                    <div>
                      <h1 className="text-body-emphasis my-2">{pageContent.attributes.descriptionHeader3}</h1>
                      <p>{pageContent.attributes.description3}</p>
                    </div>
                  }
              </div>
            </div>
          </div>

        {/* MATCHES */}
        <div className="tiles-container col2">

          <div className="fixed-tile gap-3">
            <h1>Vorrundenspiele</h1>
            {!vorrundenMatches ? <LoadingSpinner message={"Lade Matches..."}/> :
            vorrundenMatches.length === 0 ? <p className="py-2">Anstehende Matches werden in Kürze bekannt gegeben...</p> :
            <MatchList matches={vorrundenMatches}/>}
          </div>

          <div className="fixed-tile gap-3">
            <h1>Platzierungsspiele</h1>
            {!playoffMatches ? <LoadingSpinner message={"Lade Matches..."}/> :
            playoffMatches.length === 0 ? <p className="py-2">Sobald alle Vorrundenspiele beendet sind werden die Platzierungsspiele bekannt gegeben...</p> :
            <MatchList matches={playoffMatches}/>}
          </div>

        </div>

        <div className="tiles-container col2 pt-0">
          
          {/* VOTING */}
          <div className="fixed-tile gap-3">
            <h1>Wer gewinnt den Cup?</h1>
            <div className="list-group d-grid gap-2">
              {!teams ? <LoadingSpinner message={"Lade Teams..."}/> :
                teams.length === 0 ? <p>Teilnehmende Teams werden in Kürze bekannt gegeben...</p> :
                teams.map((team) => (
                  <label className="list-group-item list-group-item-action rounded d-flex gap-4 border-0">
                  <input className="form-check-input flex-shrink-0 my-auto fs-5" disabled={hasVoted} type="radio" name="listGroupRadios" id="listGroupRadios1" onClick={() => handleRadioChange(team.id, team.attributes.votingCount)}/>
                  <div className="hstack gap-3">
                      <img className="team-logo-circle rounded-3 mx-auto" src={!team.attributes.logo.data ? defaultImg : (STRAPI_CMS_URL + team.attributes.logo.data.attributes.url)} width={40} height={40} alt="Team Logo"/>
                      <div className="vstack gap-1">
                        <p className="text-start">{team.attributes.name}</p>
                        <ProgressBar currentVal={team.attributes.votingCount} maxVal={highestVoting}/>
                      </div>
                  </div>
                  </label>
                ))
              }
              {teams?.length < 4 && <p>Weitere teilnehmende Teams werden in Kürze bekannt gegeben...</p>}
            </div>
            <button type="button" className="btn btn-lg btn-success w-100" disabled={hasVoted} onClick={handleVoteButtonClick}>{hasVoted ? "Sie haben abgestimmt!" : "Jetzt Abstimmen!"}</button>
          </div>

        </div>

      </div>

      <Footer/>

    </div>
  )
}

export default EisbuabaCup2024

/*
import video from '../assets/video-playback-vertical.mp4'

<video className="video-background" id="video" loop="" muted="" data-autoplay="">
  <source src={video} type="video/mp4"/>
</video>

*/
