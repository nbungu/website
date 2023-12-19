// client/src/pages/Home.js

import React, { useState, useEffect } from "react";
import { STRAPI_CMS_URL } from "../utils/Utils";

import Header from '../components/Header.js';
import TextCarousel from '../components/TextCarousel.js';
import Tiles from '../components/Tiles.js';
import Footer from '../components/Footer.js';
import HeaderBanner from "../components/HeaderBanner.js";
import RecentNewsV2 from "../components/RecentNewsV2.js";

function Home() {
 
  /*const [postIds, setPostIds] = useState(null);

  useEffect(() => {
    // PUT request using fetch with async/await
    async function fetchTest() {
      return fetch(STRAPI_CMS_URL + "/api/posts?fields[0]=id")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        const arrayOfIds = result.data.map(item => item.id);
        setPostIds(arrayOfIds)})
      .catch((error) => {
        console.error('Error fetching post ids:', error);
        // You can handle the error here, such as displaying an error message to the user
      });
    }
    fetchTest();
  }, []);*/

  
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