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
  const queryString = STRAPI_CMS_URL + "/api/players?populate=thumbnail&pagination[pageSize]=100";

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
        
        {/* TEAM HEADER */}
        <div class="position-relative overflow-hidden p-3 p-md-3 m-md-2 text-center">
          <div class="col-md-6 p-lg-5 mx-auto my-5">
            <h1 class="display-3 fw-bold">1. Mannschaft der Eisbuaba Adelberg</h1>
            <h3 class="fw-normal text-muted my-3">Wir sind eine Eishockey Hobby-Mannschaft aus Adelberg, organisiert als Sportgruppe des ASV-Schlichten. In unserem Team steht der Spaß am Spiel an erster Stelle. Damit die spielerische Entwicklung nicht zu kurz kommt, wird in der Wintersaison regelmäßig trainiert und das Können in Freundschaftsspielen gegen Mannschaften aus der Umgebung unter Beweis gestellt.</h3>
          </div>
          <div class="product-device shadow-sm d-none d-md-block"></div>
        </div>
        <div className="tiles-container p-0">
          <img className="d-block img-fluid" src={teamPhoto}></img>
        </div>




        

        {/* GOALIE JUMBOTRON */}
        <div class="mt-3">
            <div class="text-center bg-body-tertiary shadow p-3">
              <h1 className="py-3"><i class="bi bi-bricks pe-3"/>Goalies</h1>
              <div class="container py-3 px-0">        
                {!players ? <LoadingSpinner message={"Lade Spieler..."}/> : 
                  <div class="d-flex row gap-2 g-0 justify-content-center">
                    {players.filter((player) => player.attributes.position === 'Goalie').map((player) => (<div className="col-auto"><PlayerPill player={player} colorTheme={'dark'} icon={'bi-bricks'}/></div>))}              
                  </div>
                }
              </div>
            </div>
        </div>
        {/* DEFENSE JUMBOTRON */}
        <div class="mt-3">
            <div class="text-center bg-body-tertiary shadow p-3">
              <h1 className="py-3"><i class="bi bi-shield-shaded pe-3"/>Defense</h1>
              <div class="container py-3 px-0">
                {!players ? <LoadingSpinner message={"Lade Spieler..."}/> : 
                  <div class="d-flex row gap-2 g-0 justify-content-center">
                    {players.filter((player) => player.attributes.position === 'Defence').map((player) => (<div className="col"><PlayerPill player={player} colorTheme={'warning'} icon={'bi-shield-shaded'}/></div>))}              
                  </div>
                }
              </div>
            </div>
        </div>
        {/* FORWARDS JUMBOTRON */}
        <div class="mt-3">
            <div class="text-center bg-body-tertiary shadow p-3">
              <h1 className="py-3"><i class="bi bi-crosshair pe-3"/>Forwards</h1>
              <div class="container py-3 px-0">
                {!players ? <LoadingSpinner message={"Lade Spieler..."}/> : 
                  <div class="d-flex row gap-2 g-0 justify-content-center">
                    {players.filter((player) => player.attributes.position === 'Forward').map((player) => (<div className="col"><PlayerPill player={player} colorTheme={'success'} icon={'bi-crosshair'}/></div>))}              
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