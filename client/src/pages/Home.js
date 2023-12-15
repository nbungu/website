// client/src/pages/Home.js

import React from "react";
import { STRAPI_CMS_URL, REACT_MODE } from '../utils/Utils.js';

import Header from '../components/Header.js';
import TextCarousel from '../components/TextCarousel.js';
import Tiles from '../components/Tiles.js';
import Footer from '../components/Footer.js';
import HeaderBanner from "../components/HeaderBanner.js";
import RecentNewsV2 from "../components/RecentNewsV2.js";
import { Link } from "react-router-dom";

function Home({ nodeServerStatus, nodeServerMode, onPostClicked }) {
 
  return (
    <div className='body-bg'>

      <Header currentPage={"home"}/>
      <HeaderBanner/>

      <div className="flex-grow-1">
        
        <TextCarousel/>
        <Tiles/>
        <RecentNewsV2 onPostClicked={onPostClicked}/>
        
      </div>

      <Footer/>
 
      <p className="text-center">{nodeServerStatus}</p>
      <p className="text-center">{'server mode: ' + nodeServerMode}</p>
      <p className="text-center">{'strapi url: ' + STRAPI_CMS_URL}</p>
      <p className="text-center">{'react mode: ' + REACT_MODE}</p>
      
    </div>
  )
}

export default Home