// client/src/pages/Home.js

import React from "react";

import Header from '../components/Header.js';
import TextCarousel from '../components/TextCarousel.js';
import Tiles from '../components/Tiles.js';
import RecentNews from "../components/RecentNews.js";
import Footer from '../components/Footer.js';
import HeaderBanner from "../components/HeaderBanner.js";

function Home({ nodeServerStatus, onPostClicked }) {
 
  return (
    <div className='body-bg'>

      <Header currentPage={"home"}/>
      <HeaderBanner/>

      <div className="flex-grow-1">
        <TextCarousel/>
        <Tiles/>
        <RecentNews onPostClicked={onPostClicked}/>
      </div>

      <Footer/>
 
      <p className="text-center">{nodeServerStatus}</p>
      
    </div>   
  )
}

export default Home