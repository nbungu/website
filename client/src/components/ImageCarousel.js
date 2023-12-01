// client/src/components/ImageCarousel.js

import React from 'react';

function ImageCarousel({ imagePaths }) {  
 
  return (
    <div id="imageCarousel" className="carousel slide" data-bs-ride="carousel">
      
      <div className="carousel-inner">
        <div className="carousel-item h-100 active">
          <img className='rounded' src={imagePaths.shift()} alt=''/>
        </div>
        {imagePaths.map((imgPath) => (
          <div className="carousel-item h-100">
            <img className='rounded' src={imgPath} alt=''/>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

    </div>
  )
}

export default ImageCarousel

/*

          
        {imagePaths.map((imgPath) => (
          <div className="carousel-item">
            <img className='carousel-image' src={imgPath} alt=''/>
          </div>
        ))}

*/