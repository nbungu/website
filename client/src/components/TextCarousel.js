// client/src/components/TextCarousel.js

import React, { useState, useEffect } from "react";
import { STRAPI_CMS_URL } from '../utils/Utils.js';
import LoadingSpinner from "./LoadingSpinner.js";

function TextCarousel() {
  
  const queryString = STRAPI_CMS_URL + "/api/header-text-slider";

  // GET Request to STRAPI server (backend) at endpoint /api/posts
  const [carouselBanners, setCarouselBanners] = useState(null);

  const fetchCarouselBanners = () => {
    return fetch(queryString)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => setCarouselBanners(result.data))
      .catch((error) => {
        console.error('Error fetching featured posts:', error);
        // You can handle the error here, such as displaying an error message to the user
      });
  };

  // We want fetchCarouselBanners() to be executed everytime App component loads
  useEffect(() => {
    fetchCarouselBanners();
  }, []);

  return (
    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
      
      <div className="carousel-indicators m-0">
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" aria-label="Slide 1" className="active"  aria-current="true"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" className=""></button>
      </div>
      
      <div className="carousel-inner">

        {!carouselBanners ? <LoadingSpinner message={"Lade CarouselBanner..."}/> : 
          <>
          <div className="carousel-item active">            
            <div className="container">
              <div className="carousel-caption text-start">
                <h1>{carouselBanners.attributes.title1}</h1>
                <p>{carouselBanners.attributes.text1}</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="carousel-caption text-center">
                <h1>{carouselBanners.attributes.title2}</h1>
                <p>{carouselBanners.attributes.text2}</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="carousel-caption text-end">
                <h1>{carouselBanners.attributes.title3}</h1>
                <p>{carouselBanners.attributes.text3}</p>
              </div>
            </div>
          </div>
          </>
        }

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

/**



              {!carouselBanners ? <LoadingSpinner/> :
        carouselBanners.map((banner) => (
          <div className="carousel-item">
            <div className="container">
              <div className="carousel-caption text-start">
                <h1>{banner.attributes.title}</h1>
                <p>{banner.attributes.summary}</p>
              </div>
            </div>
          </div>
        ))      
      }

 */