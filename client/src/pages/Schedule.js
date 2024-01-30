// client/src/pages/Schedule.js

import React, { useState, useEffect } from "react";

import Header from '../components/Header';
import Footer from '../components/Footer';
import EventList from '../components/EventList';
import LoadingSpinner from '../components/LoadingSpinner';
import { useEvents, useMatches } from "../utils/fetchContent.js";
import MatchListEntry from "../components/MatchListEntry.js";

function Schedule() { 
  
  const [isFirstStateEvents, setIsFirstStateEvents] = useState(true);
  const [groupedByYear, setGroupedByYear] = useState(null);

  const showOnlyEisbuabaMatches = true;
  const showOnlyFinishedMatches = false;
  const { matches, reversedMatches } = useMatches(showOnlyEisbuabaMatches, showOnlyFinishedMatches);
  const { events, reversedEvents } = useEvents();

  const switchSortOrderEvents = () => {    
    setIsFirstStateEvents(!isFirstStateEvents);
  };

  // Function to group array of objects by a specific property. acc = accumulator
  // obj = match
  function groupByYear(arr) {
    if (groupedByYear) return groupedByYear;
    console.log("groupByYear");
    return arr?.reduce((acc, obj) => {
        // matchYear is the 'key'
        const matchYear = obj.attributes.faceoffTime.slice(0, 4);
        if (!acc[matchYear]) acc[matchYear] = [];
        acc[matchYear].push(obj);
        return acc;
    }, {});
  }

  // We want updateMetaTags() to be executed everytime App component initially loads
  useEffect(() => {
    document.title = "Termine > Eisbuaba Adelberg";
  }, []);
  // Whenever value of 'matches' changes, start grouping.
  useEffect(() => {
    setGroupedByYear(groupByYear(matches));
  }, [matches]);

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
          {!groupedByYear ? <LoadingSpinner message={"Lade Matches..."}/> : 
            <>
              {Object.keys(groupedByYear).reverse().map(year => (
                  <div key={year}>
                      <h2 className="opacity-75 mb-1">{year}</h2>
                      <div className="list-group w-100">{groupedByYear[year].map((match, index) => (<MatchListEntry match={match} showExtendedInfos={true} key={index}/>))}</div>
                  </div>
              ))}
            </>          
          }

        </div>

      </div>

      <Footer/>
      
    </div>
  )
}

export default Schedule

/*

<MatchList matches={isFirstStateMatches ? matches : reversedMatches} showExtendedInfos={true}/>


            <>
              {Object.keys(isFirstStateMatches ? groupedByYear : groupedByYearReversed).map(year => (
                  <div key={year}>
                      <p>year: {year}</p>
                      <div className="list-group w-100">{groupedByYear[year].map((match, index) => (<MatchListEntry match={match} showExtendedInfos={true} key={index}/>))}</div>
                  </div>
              ))}
            </> 

*/