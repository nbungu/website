// client/src/components/TextCarousel.js

import React from 'react';

function TextCarousel() {
  
  return (
    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
      
      <div className="carousel-indicators m-0">
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" className="active" aria-current="true"></button>
      </div>

      <div className="carousel-inner">
          <div className="carousel-item">
            <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bg-main-blue3)"></rect></svg>
            <div className="container">
              <div className="carousel-caption text-start">
                <h1>Wir suchen Dich!</h1>
                <p>Unser Eishockeyverein sucht junge Nachwuchsspieler mit Leidenschaft auf dem Eis. Jetzt anmelden!</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bg-main-blue1)"></rect></svg>
            <div className="container">
              <div className="carousel-caption">
                <h1>Saisonstart 2023/24</h1>
                <p>Es ist wieder soweit! Anfang Oktober ist das Eis bereit für die neue Saison.</p>
              </div>
            </div>
          </div>
          <div className="carousel-item active">
            
            <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="var(--bg-main-blue2)"></rect></svg>
            <div className="container">
              <div className="carousel-caption text-end">
                <h1>Eisbuaba-Cup 2024 </h1>
                <p>Auch im kommenden Jahr findet das traditionsreiche Turnier in Adelberg statt!</p>
              </div>
            </div>

          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

      </div>
  )
}

export default TextCarousel