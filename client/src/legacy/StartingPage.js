// client/src/StartingPage.js

import React from 'react';
import Carousel from "./Carousel.js";
import Featurettes from './Featurettes.js';
import Tiles from './Tiles.js';

function StartingPage() {
  
  return (
    <div>
      <Carousel/>
      <Tiles/>
      <Featurettes/>
    </div>   
  )
}

export default StartingPage