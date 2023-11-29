// client/src/Tiles.js

import React from 'react';

function Tiles() {
  
  return (   
    
    <div className="container-fluid">
        <div className="tiles-container-flex">

          <div className="button-tile">
            <a href="01-news.html" className="tile-link">
                <i className="bi bi-newspaper" style={{fontSize: '2rem', color: 'cornflowerblue'}}></i>
                <h2>News</h2>
                <p>Aktuelles vom Verein, Sponsoren und Mannschaften der Eisbuaba Adelberg</p>
            </a>
          </div>

          <div className="button-tile">
              <a href="02-schedule.html" className="tile-link">
                  <i className="bi bi-calendar2-week-fill" style={{fontSize: '2rem', color: 'cornflowerblue'}}></i>
                  <h2>Termine</h2>
                  <p>Aktuelle Trainingszeiten, Spiele & Veranstaltungen.</p>
              </a>
          </div>

          <div className="button-tile">
              <a href="membership.html" className="tile-link">
                  <i className="bi bi-person-fill-add" style={{fontSize: '2rem', color: 'cornflowerblue'}}></i>
                  <h2>Mitgliedschaft</h2>
                  <p>Interesse geweckt und Lust auf Eishockey?</p>
              </a>      
          </div>

          <div className="button-tile">
            <a href="03-contact.html" className="tile-link">                
                <i className="bi bi-chat-left-dots-fill" style={{fontSize: '2rem', color: 'cornflowerblue'}}></i>
                <h2>Kontakt</h2>
                <p>Bei Fragen rund um den Verein oder die Mitgliedschaft</p>
            </a>
          </div>

          <div className="button-tile span2">
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">Neu</span>
            <a href="eisbuaba-cup-2024.html" className="tile-link">                
                <i className="bi bi-trophy-fill" style={{fontSize: '2rem', color: 'orange'}}></i>
                <h2>Eisbuaba-Cup 2024</h2>
            </a>
          </div>

          <div className="button-tile span2">
            <span className="position-absolute top-0 start-100 translate-middle badge bg-secondary">2023</span>
            <a href="nachwuchs.html" className="tile-link">                
                <i className="bi bi-person-arms-up" style={{fontSize: '2rem', color: 'cornflowerblue'}}></i>
                <h2>Nachwuchstraining</h2>
            </a>
          </div>

        </div>
      </div>
  )
}
export default Tiles