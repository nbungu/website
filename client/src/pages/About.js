// client/src/pages/About.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import PlayerPill from '../components/PlayerPill';
import { STRAPI_CMS_URL } from '../utils/Utils.js';
import LoadingSpinner from "../components/LoadingSpinner";

import teamPhoto from '../assets/team-photo.jpg'

function About() {
  
  // Returns all posts including media data sorted by date
  const queryString = STRAPI_CMS_URL + "/api/players?populate=thumbnail";

  // GET Request to STRAPI server (backend) at endpoint /api/posts
  const [players, setPlayers] = useState(null);

  const fetchPlayers = () => {
      return fetch(queryString)
      .then((response) => {
          if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then((result) => setPlayers(result.data))
      .catch((error) => {
          console.error('Error fetching players:', error);
          // You can handle the error here, such as displaying an error message to the user
      });
  };

// We want fetchCarouselBanners() to be executed everytime App component loads
useEffect(() => {
  fetchPlayers();
}, []);
  
  return (
    <div className='body-bg'>

      <Header currentPage={'about'}/>

      <div className='flex-grow-1'>

        <div className="tiles-container p-0">
          <img className="d-block img-fluid" src={teamPhoto}></img>
        </div>
        

        {/* FULL WIDTH JUMBOTRON */}
        <div class="mt-3">
            <div class="text-center bg-body-tertiary shadow p-5">
                <div class="container">
                  <h1>Goalies</h1>            
                  {!players ? <LoadingSpinner message={"Lade Spieler..."}/> : 
                    <div class="d-flex gap-2 justify-content-center py-5">
                      {players.filter((player) => player.attributes.position === 'Goalie').map((player) => (<PlayerPill player={player} colorTheme={'success'}/>))}              
                    </div>
                  }
                </div>
            </div>
        </div>
        <div class="mt-3">
            <div class="text-center bg-body-tertiary shadow p-5">
                <div class="container">
                  <h1>Defence</h1>
                  {!players ? <LoadingSpinner message={"Lade Spieler..."}/> : 
                    <div class="d-flex gap-2 justify-content-center py-5">
                      {players.filter((player) => player.attributes.position === 'Defence').map((player) => (<PlayerPill player={player} colorTheme={'warning'}/>))}              
                    </div>
                  }
                </div>
            </div>
        </div>
        <div class="mt-3">
            <div class="text-center bg-body-tertiary shadow p-5">
                <div class="container">
                  <h1>Forwards</h1>
                  {!players ? <LoadingSpinner message={"Lade Spieler..."}/> : 
                    <div class="d-flex gap-2 justify-content-center py-5">
                      {players.filter((player) => player.attributes.position === 'Forward').map((player) => (<PlayerPill player={player} colorTheme={'primary'}/>))}              
                    </div>
                  }
                </div>
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default About