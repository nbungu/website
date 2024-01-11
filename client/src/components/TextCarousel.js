// client/src/components/TextCarousel.js

import React from "react";

function TextCarousel({ bannerContent }) { 
  
  return (
    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
              
      <div className="carousel-inner">
          <div className="carousel-item active">            
            <div className="container">
              <div className="carousel-caption text-start">
                <h1>{bannerContent.attributes.title1}</h1>
                <p>{bannerContent.attributes.text1}</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="carousel-caption text-center">
                <h1>{bannerContent.attributes.title2}</h1>
                <p>{bannerContent.attributes.text2}</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="carousel-caption text-end">
                <h1>{bannerContent.attributes.title3}</h1>
                <p>{bannerContent.attributes.text3}</p>
              </div>
            </div>
          </div>
      </div>

      <div className="carousel-indicators m-0">
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" aria-label="Slide 1" className="active" aria-current="true"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" className=""></button>
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