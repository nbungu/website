// client/src/pages/EisbuabaCup2024.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventList from '../components/EventList';
import LoadingSpinner from '../components/LoadingSpinner';
import { STRAPI_CMS_URL } from '../utils/Utils.js';

import logo from "../assets/eisbuaba-cup-logo.png";
import defaultImg from '../assets/default-image.png'
import MatchList from "../components/MatchList.js";


function EisbuabaCup2024({ onPostClicked }) {
  
    // fetches the last two most recent posts in sorted order
    const queryString1 = STRAPI_CMS_URL + "/api/events/6?populate=*";
    const queryString2 = STRAPI_CMS_URL + "/api/teams?filters[active][$eq]=true&populate=*";
    const queryString3 = STRAPI_CMS_URL + "/api/matches?populate[teamHome][populate][0]=logo&populate[teamAway][populate][0]=logo&sort=faceoffTime";
    const [event, setEvent] = useState(null);
    const [teams, setTeams] = useState(null);
    const [matches, setMatches] = useState(null);
  
    const fetchEvent = () => {
      return fetch(queryString1)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => setEvent([result.data]))
        .catch((error) => {
          console.error('Error fetching events:', error);
          // You can handle the error here, such as displaying an error message to the user
        });
    };
    const fetchTeams = () => {
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
    const fetchMatches = () => {
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
  
    // We want fetchPosts() to be executed everytime App component loads
    useEffect(() => {
      fetchEvent();
      fetchTeams();
      fetchMatches();
    }, []);

  return (
    <div className='body-bg'>

      <Header currentPage={null}/>

      <div className='flex-grow-1'>

        {/* JUMBOTRON */}
        <div class="container my-5">
          <div class="p-5 text-center bg-body-tertiary rounded-3 video-bg">
            <img className='bi mt-4 mb-3' width={96} height={96} src={logo} alt="Eisbuaba-Cup Logo"/>
            <h1 className="mb-2">Eisbuaba Cup 2024</h1>
            <p class="col-lg-8 mx-auto fs-5 text-muted">
              Ein Eishockey-Turnier für Hobby-Mannschaften aus der Region. Der 'Eisbuaba Cup 2024' verspricht packende Action, bierliga Eishockey und jede Menge Unterhaltung. Nach einer Gruppenphase wird der Gewinner im Playoff-Modus ermittelt. Die Matchdauer beträgt 2 x 10 Minuten. <a href="/kontakt">Team Anmeldung</a> bis zum 21.02.2024 möglich.
            </p>
            <div class="d-inline-flex gap-2 mt-4 mb-5">
              <button class="d-inline-flex align-items-center btn btn-danger btn-lg px-4 rounded-pill" type="button">
                Livestream
                <i className="bi bi-youtube ps-2 fs-4"/>
              </button>
              <button class="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button">
                Spielplan
                <i className="bi bi-file-earmark-arrow-down ps-2"/>
              </button>
              
            </div>

            {!event ? <LoadingSpinner message={"Lade Termin..."}/> : <div className="my-4"><EventList events={event} onPostClicked={onPostClicked}/></div>}

          </div>
        </div>
    
        {/* TEAMS & ERGEBNISSE */}
        <div className="tiles-container-flex-sm pt-0">      
           
           <div className="fixed-tile">
            <h2>Teams</h2>
              <div className="tiles-container-flex">
                {!teams ? <LoadingSpinner message={"Lade Teams..."}/> :
                  teams.map((team) => (
                    <div className="news-tile">
                      <img className="rounded-circle mx-auto" width={64} height={64} src={!team.attributes.logo.data ? defaultImg : (STRAPI_CMS_URL + team.attributes.logo.data.attributes.url)} alt="Team Logo"/>
                      <p className="text-center">{team.attributes.name}</p>
                    </div>
                  ))
                }
              </div>
          </div> 

          <div className="fixed-tile gap-3">
            <h2>Ergebnisse</h2>
              {!matches ? <LoadingSpinner message={"Lade Ergebnisse..."}/> : <MatchList matches={matches}/>}
          </div>
        </div>

      </div>      

      <Footer/>
      
    </div>
  )
}

export default EisbuabaCup2024