// client/src/pages/About.js

import React, { useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import PlayerPill from '../components/PlayerPill';
import { usePlayers } from '../utils/fetchContent.js';
import LoadingSpinner from "../components/LoadingSpinner";


import teamPhoto from '../assets/team-photo.jpg'

function About() {
  
  const players = usePlayers();
    
  // We want fetchPlayers() to be executed everytime App component loads
  useEffect(() => {
    document.title = "Team > Eisbuaba Adelberg";
  }, []);
  
  return (
    <div className='body-bg'>

      <Header currentPage={'about'}/>

      <div className='flex-grow-1'>
        
        {/* TEAM HEADER */}
        <div className="position-relative overflow-hidden p-3 p-md-3 m-md-2 text-center">
          <div className="col-md-6 p-lg-5 mx-auto my-5">
            <h1 className="display-3 fw-bold">1. Mannschaft der Eisbuaba Adelberg</h1>
            <h3 className="fw-normal text-muted my-3">Wir sind eine Eishockey Hobby-Mannschaft aus Adelberg, organisiert als Sportgruppe des ASV-Schlichten. In unserem Team steht der Spaß am Spiel an erster Stelle. Damit die spielerische Entwicklung nicht zu kurz kommt, wird in der Wintersaison regelmäßig trainiert und das Können in Freundschaftsspielen gegen Mannschaften aus der Umgebung unter Beweis gestellt.</h3>
          </div>
          <div className="product-device shadow-sm d-none d-md-block"></div>
        </div>
        <div className="tiles-container col1 p-0">
          <img className="d-block img-fluid" src={teamPhoto}></img>
        </div>

        {/* GOALIE JUMBOTRON */}
        <div className="mt-3">
            <div className="text-center bg-body-tertiary shadow p-3">
              <h1 className="py-3"><i className="bi bi-bricks pe-3"/>Goalies</h1>
              <div className="container py-3 px-0">        
                {!players ? <LoadingSpinner message={"Lade Spieler..."}/> : 
                  <div className="d-flex row gap-2 g-0 justify-content-center">
                    {players.filter((player) => player.attributes.position === 'Goalie').map((player, index) => (<div className="col-auto" key={index}><PlayerPill player={player} colorTheme={'dark'} icon={'bi-bricks'}/></div>))}              
                  </div>
                }
              </div>
            </div>
        </div>
        {/* DEFENSE JUMBOTRON */}
        <div className="mt-3">
            <div className="text-center bg-body-tertiary shadow p-3">
              <h1 className="py-3"><i className="bi bi-shield-shaded pe-3"/>Defense</h1>
              <div className="container py-3 px-0">
                {!players ? <LoadingSpinner message={"Lade Spieler..."}/> : 
                  <div className="d-flex row gap-2 g-0 justify-content-center">
                    {players.filter((player) => player.attributes.position === 'Defence').map((player, index) => (<div className="col" key={index}><PlayerPill player={player} colorTheme={'warning'} icon={'bi-shield-shaded'}/></div>))}              
                  </div>
                }
              </div>
            </div>
        </div>
        {/* FORWARDS JUMBOTRON */}
        <div className="mt-3">
            <div className="text-center bg-body-tertiary shadow p-3">
              <h1 className="py-3"><i className="bi bi-crosshair pe-3"/>Forwards</h1>
              <div className="container py-3 px-0">
                {!players ? <LoadingSpinner message={"Lade Spieler..."}/> : 
                  <div className="d-flex row gap-2 g-0 justify-content-center">
                    {players.filter((player) => player.attributes.position === 'Forward').map((player, index) => (<div className="col" key={index}><PlayerPill player={player} colorTheme={'success'} icon={'bi-crosshair'}/></div>))}              
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