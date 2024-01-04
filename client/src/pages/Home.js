// client/src/pages/Home.js

import React, { useEffect } from "react";
import Header from '../components/Header.js';
import TextCarousel from '../components/TextCarousel.js';
import Footer from '../components/Footer.js';
import HeaderBanner from "../components/HeaderBanner.js";
import RecentNews from "../components/RecentNews.js";
import ButtonTile from "../components/ButtonTile.js";

function Home() {
   
  const updateMetaTags = () => {
    // Update Open Graph meta tags dynamically
    document.title = "Startseite > Eisbuaba Adelberg";
    document.querySelector('meta[property="og:title"]').setAttribute('content', "Startseite");
    document.querySelector('meta[property="og:description"]').setAttribute('content', 'Infos, Spieltermine und News rund um den Verein');
    document.querySelector('meta[property="og:url"]').setAttribute('content', 'https://eisbuaba-adelberg.de');
  };

  // We want updateMetaTags() to be executed everytime App component loads
  useEffect(() => {
    updateMetaTags();
  }, []);
  
  return (
    <div className='body-bg'> 

      <Header currentPage={"home"}/>

      <HeaderBanner/>

      <div className="flex-grow-1">
        
        <TextCarousel/>

        <div className="tiles-container-flex col4 mt-2">
          <ButtonTile link={"/eisbuaba-cup-2024"} icon={"bi bi-trophy-fill"} iconColor={"orange"} header={"Eisbuaba-Cup"} badgeText={"2024"} text={"Freitag, 01. März 2024, 20:30 Uhr"} z={1}/>
          <ButtonTile link={"/news/9"} icon={"bi bi-person-arms-up"} header={"Nachwuchstraining"} text={"Montags, 18:00 - 19:00 Uhr"}/>
          <ButtonTile link={"/about"} icon={"bi bi-people-fill"} header={"Über Uns"} text={"1. Mannschaft der Eisbuaba"}/>
          <ButtonTile link={"/kontakt"} icon={"bi bi-chat-left-dots-fill"} header={"Kontakt"} text={"Kontaktpersonen und Anfahrt"}/>
        </div>

        <RecentNews/>

      </div>

      <Footer/>
      
    </div>
  )
}

export default Home