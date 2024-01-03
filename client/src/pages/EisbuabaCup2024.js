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
    const [matches, setMatches] = useState(null);
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
        .then((result) => setMatches(result.data))
        .catch((error) => {
          console.error('Error fetching matches:', error);
          // You can handle the error here, such as displaying an error message to the user
        });
    };
    const updateMetaTags = () => {
      // Update Open Graph meta tags dynamically
      document.title = "Eisbuaba Cup 2024 > Eisbuaba Adelberg";
      document.querySelector('meta[property="og:title"]').setAttribute('content', "Eisbuaba Cup 2024");
      document.querySelector('meta[property="og:description"]').setAttribute('content', 'Infos rund um den Eisbuaba Cup 2024');
      document.querySelector('meta[property="og:url"]').setAttribute('content', 'https://eisbuaba-adelberg.de/eisbuaba-cup-2024');
    };
  
    // We want fetchXY() etc. to be executed everytime App component loads
    useEffect(() => {
      fetchPageContent();
      fetchActiveTeams();
      fetchCupMatches();
      fetchHighestVoting();
      updateMetaTags();
    }, []);

  return (
    <div className='body-bg'>

      <Header currentPage={null}/>

      <div className='flex-grow-1'>

        {/* FULL WIDTH JUMBOTRON */}
        <div class="mt-5">
            <div class="text-center bg-body-tertiary shadow p-5">
                <div class="container">
                  {!pageContent ? <LoadingSpinner message={"Lade Content..."}/> : 
                  <>
                  <img className='bi p-2' width={200} height={200} src={STRAPI_CMS_URL + pageContent.attributes.logo.data.attributes.url} alt="Eisbuaba-Cup Logo"/>
                  <h3 class="fs-2 text-body-emphasis p-1">{pageContent.attributes.title}</h3>
                  <p class="col-lg-8 mx-auto lead p-1">{pageContent.attributes.summary}</p>
                  </>
                  }
                  <div class="row gap-3 p-3 justify-content-center">
                    <a href={pageContent?.attributes.livestreamlink ? pageContent.attributes.livestreamlink : '#'} class="col-sm-4 btn btn-danger btn-lg px-4 rounded-pill" role="button">
                      Livestream
                      <i className="bi bi-youtube ps-2 fs-4"/>
                    </a>
                    <button class="col-sm-4 btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button">
                      Spielplan
                      <i className="bi bi-file-earmark-arrow-down ps-2"/>
                    </button>
                  </div>
                </div>
            </div>
        </div>

        {/* DESCRIPTION */}
        <div class="container p-5" id="hanging-icons">
            <div class="row g-4 py-3 row-cols-1 row-cols-lg-3">
              <div class="col d-flex align-items-start">
                  <div class="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center flex-shrink-0 me-3">
                    <i class="bi bi-clock fs-1"></i>
                  </div>
                  <div>
                    <h3 class="fs-2 text-body-emphasis">Wann und Wo?</h3>
                    {!pageContent ? <LoadingSpinner message={"Lade Content..."}/> : 
                    <p className="fs-5">{pageContent.attributes.description1}</p>}
                  </div>
              </div>
              <div class="col d-flex align-items-start">
                  <div class="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center flex-shrink-0 me-3">
                    <i class="bi bi-pencil-square fs-1"></i>
                  </div>
                  <div>
                    <h3 class="fs-2 text-body-emphasis">Anmeldung</h3>
                    {!pageContent ? <LoadingSpinner message={"Lade Content..."}/> : 
                    <p className="fs-5">{pageContent.attributes.description2}</p>}
                  </div>
              </div>
              <div class="col d-flex align-items-start">
                  <div class="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center flex-shrink-0 me-3">
                    <i class="bi bi-crosshair fs-1"></i>
                  </div>
                  <div>
                    <h3 class="fs-2 text-body-emphasis">Spielmodus</h3>
                    {!pageContent ? <LoadingSpinner message={"Lade Content..."}/> : 
                    <p className="fs-5">{pageContent.attributes.description3}</p>}
                  </div>
              </div>
              
            </div>
        </div>

        {/* VOTING & ERGEBNISSE */}
        <div className="tiles-container-flex-sm pt-0">      
           
          <div className="fixed-tile gap-4">
            <h2>Wer gewinnt den Cup?</h2>            
            <div class="list-group d-grid gap-3">
              {!teams ? <LoadingSpinner message={"Lade Teams..."}/> :
                teams.length === 0 ? <p>Teilnehmende Teams werden in Kürze bekannt gegeben...</p> :
                teams.map((team) => (
                  <label class="list-group-item list-group-item-action rounded d-flex gap-4 border-0">
                  <input class="form-check-input flex-shrink-0 my-auto fs-5" disabled={hasVoted} type="radio" name="listGroupRadios" id="listGroupRadios1" onClick={() => handleRadioChange(team.id, team.attributes.votingCount)}/>
                  <div className="hstack gap-3">
                      <img className="rounded-circle mx-auto" src={!team.attributes.logo.data ? defaultImg : (STRAPI_CMS_URL + team.attributes.logo.data.attributes.url)} width={40} height={40} alt="Team Logo"/>
                      <div className="vstack gap-1">
                        <p className="text-start">{team.attributes.name}</p>
                        <ProgressBar currentVal={team.attributes.votingCount} maxVal={highestVoting}/>
                      </div>
                  </div>
                  </label>
                ))
              }
            </div>

            {!teams && <button type="button" class="btn btn-lg btn-success w-100" disabled={hasVoted} onClick={handleVoteButtonClick}>{hasVoted ? "Sie haben abgestimmt!" : "Jetzt Abstimmen!"}</button>}

          </div> 

          <div className="fixed-tile gap-3">
            <h2>Matches & Ergebnisse</h2>
              {!matches ? <LoadingSpinner message={"Lade Ergebnisse..."}/> :
              matches.length === 0 ? <p className="py-2">Anstehende Matches werden in Kürze bekannt gegeben...</p> :
              <MatchList matches={matches}/>}
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