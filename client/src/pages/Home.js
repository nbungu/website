// client/src/pages/Home.js

import React, { useEffect } from "react";
import { useCarouselBanners, useMatches, usePosts } from "../utils/fetchContent";

import Header from '../components/Header.js';
import TextCarousel from '../components/TextCarousel.js';
import Footer from '../components/Footer.js';
import HeaderBanner from "../components/HeaderBanner.js";
import RecentNews from "../components/RecentNews.js";
import ButtonTile from "../components/ButtonTile.js";
import RecentMatches from "../components/RecentMatches.js";
import LoadingSpinner from "../components/LoadingSpinner.js";

function Home() {

  const showOnlyEisbuabaMatches = true;
  const showOnlyFinishedMatches = true;
  const paginationLimitMatches = 8;
  const { matches } = useMatches(showOnlyEisbuabaMatches, showOnlyFinishedMatches, paginationLimitMatches);

  const paginationLimitPosts = 2;
  const sortOrder = "desc";
  const { posts } = usePosts(paginationLimitPosts, sortOrder);

  const bannerContent = useCarouselBanners();

  // We want updateMetaTags() to be executed everytime App component loads
  useEffect(() => {
    document.title = "Startseite > Eisbuaba Adelberg";
  }, []);
  
  return (
    <div className='body-bg'> 

      <Header currentPage={"home"}/>

      <HeaderBanner/>

      <div className="flex-grow-1">
        
        <div className="tiles-container col1">
          {!bannerContent ? <LoadingSpinner message={"Lade CarouselBanner..."}/> : <TextCarousel bannerContent={bannerContent}/>}
        </div>        

        <div className="tiles-container col4 mt-2">
          <ButtonTile link={"/eisbuaba-cup-2024"} icon={"bi bi-trophy-fill"} iconColor={"orange"} header={"Eisbuaba-Cup"} badgeText={"2024"} text={"Freitag, 01. März 2024, 20:30 Uhr"} z={1}/>
          <ButtonTile link={"/news/9"} icon={"bi bi-person-arms-up"} header={"Nachwuchstraining"} text={"Montags, 18:00 - 19:00 Uhr"}/>
          <ButtonTile link={"/about"} icon={"bi bi-people-fill"} header={"Über Uns"} text={"1. Mannschaft der Eisbuaba"}/>
          <ButtonTile link={"/kontakt"} icon={"bi bi-chat-left-dots-fill"} header={"Kontakt"} text={"Kontaktpersonen und Anfahrt"}/>
        </div>

        <div className="tiles-container col1">
          {!posts ? <LoadingSpinner message={"Lade News..."}/> : <RecentNews recentNews={posts}/>}
          {!matches ? <LoadingSpinner message={"Lade Matchverlauf..."}/> : <RecentMatches matches={matches}/>}
        </div>

      </div>

      <Footer/>
      
    </div>
  )
}

export default Home