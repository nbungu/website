// client/src/pages/Home.js

import React from "react";

import Header from '../components/Header.js';
import TextCarousel from '../components/TextCarousel.js';
import Footer from '../components/Footer.js';
import HeaderBanner from "../components/HeaderBanner.js";
import RecentNews from "../components/RecentNews.js";
import ButtonTile from "../components/ButtonTile.js";

function Home() {
   
  return (
    <div className='body-bg'>

      <Header currentPage={"home"}/>

      <HeaderBanner/>

      <div className="flex-grow-1">
        
        <TextCarousel/>

        <div className="tiles-container-flex mt-3">
          <ButtonTile link={"/eisbuaba-cup-2024"} icon={"bi bi-trophy-fill"} iconColor={"orange"} header={"Eisbuaba-Cup"} badgeText={"2024"} text={"Freitag, 01. März 2024, ab 20:00 Uhr"} z={1}/>
          <ButtonTile link={"/news/9"} icon={"bi bi-person-arms-up"} header={"Nachwuchstraining"} text={"Montags, 18:00 - 19:00 Uhr"}/>
          <ButtonTile link={"/mitgliedschaft"} icon={"bi bi-person-fill-add"} header={"Mitgliedschaft"} text={"Interesse geweckt und Lust auf Eishockey?"}/>
          <ButtonTile link={"/kontakt"} icon={"bi bi-chat-left-dots-fill"} header={"Kontakt"} text={"Kontaktpersonen und Anfahrt"}/>
        </div>

        <RecentNews/>

      </div>

      <Footer/>
      
    </div>
  )
}

export default Home