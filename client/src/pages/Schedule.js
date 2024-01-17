// client/src/pages/Schedule.js

import React, { useState, useEffect } from "react";

import Header from '../components/Header';
import Footer from '../components/Footer';
import EventList from '../components/EventList';
import LoadingSpinner from '../components/LoadingSpinner';
import MatchList from "../components/MatchList.js";
import { useEvents, useMatches } from "../utils/fetchContent.js";

function Schedule() { 
  
  const [isFirstStateMatches, setIsFirstStateMatches] = useState(true);
  const [isFirstStateEvents, setIsFirstStateEvents] = useState(true);

  const showOnlyEisbuabaMatches = true;
  const showOnlyFinishedMatches = false;
  const paginationLimit = 50;
  const { matches, reversedMatches } = useMatches(showOnlyEisbuabaMatches, showOnlyFinishedMatches, paginationLimit);
  const { events, reversedEvents } = useEvents();

  const switchSortOrderMatches = () => {  
    setIsFirstStateMatches(!isFirstStateMatches);
  };
  const switchSortOrderEvents = () => {    
    setIsFirstStateEvents(!isFirstStateEvents);
  };

  // We want updateMetaTags() to be executed everytime App component initially loads
  useEffect(() => {
    document.title = "Termine > Eisbuaba Adelberg";
  }, []);
  
  return (
    <div className='body-bg'>

      <Header currentPage={"schedule"}/>
      
      <div className='flex-grow-1'>

        <div className="tiles-container col1 pb-0">

          <h1 className="mb-2">Termine</h1>
          <div className="row w-100 mx-auto">
            <button type="button" className="col-auto btn btn-light" onClick={switchSortOrderEvents}><i className={isFirstStateEvents ? 'bi bi-arrow-down pe-2' : 'bi bi-arrow-up pe-2'}/>{isFirstStateEvents ? 'Zeige neueste zuerst' : 'Zeige älteste zuerst'}</button>
          </div>
          {!events ? <LoadingSpinner message={"Lade Termine..."}/> : <EventList events={isFirstStateEvents ? events : reversedEvents} showExtendedInfos={true}/>}

          <h1 className="mb-2">Spiele</h1>
          <div className="row w-100 mx-auto">
            <button type="button" className="col-auto btn btn-light" onClick={switchSortOrderMatches}><i className={isFirstStateMatches ? 'bi bi-arrow-up pe-2' : 'bi bi-arrow-down pe-2'}/>{isFirstStateMatches ? 'Zeige älteste zuerst' : 'Zeige neueste zuerst'}</button>
          </div>
          {!matches ? <LoadingSpinner message={"Lade Matches..."}/> : <MatchList matches={isFirstStateMatches ? matches : reversedMatches} showExtendedInfos={true}/>}

        </div>

      </div>

      <Footer/>
      
    </div>
  )
}

export default Schedule