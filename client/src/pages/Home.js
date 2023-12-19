// client/src/pages/Home.js

import React from "react";

import Header from '../components/Header.js';
import TextCarousel from '../components/TextCarousel.js';
import Tiles from '../components/Tiles.js';
import Footer from '../components/Footer.js';
import HeaderBanner from "../components/HeaderBanner.js";
import RecentNewsV2 from "../components/RecentNewsV2.js";

function Home() {
   
  return (
    <div className='body-bg'>

      <Header currentPage={"home"}/>

      <HeaderBanner/>

      <div className="flex-grow-1">
        
        <TextCarousel/>
        <Tiles/>
        <RecentNewsV2/>
        
      </div>

      <Footer/>
      
    </div>
  )
}

export default Home