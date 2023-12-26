// client/src/pages/Schedule.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventList from '../components/EventList';
import LoadingSpinner from '../components/LoadingSpinner';
import { STRAPI_CMS_URL } from '../utils/Utils.js';
import MatchList from "../components/MatchList.js";

function Schedule() { 
  
  const [sortOrderEvents, setSortOrderEvents] = useState('asc');
  const [sortOrderMatches, setSortOrderMatches] = useState('desc');
  const [events, setEvents] = useState(null);
  const [matches, setMatches] = useState(null);

  // fetches the last two most recent posts in sorted order
  const queryString = STRAPI_CMS_URL + "/api/events?populate=*&sort=date:" + sortOrderEvents;
  const queryString2 = STRAPI_CMS_URL + "/api/matches?populate[teamHome][populate][0]=logo&populate[teamAway][populate][0]=logo&sort=faceoffTime:" + sortOrderMatches;

  const fetchEvents = () => {
    return fetch(queryString)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => setEvents(result.data))
      .catch((error) => {
        console.error('Error fetching events:', error);
        // You can handle the error here, such as displaying an error message to the user
      });
  };
  const fetchEisbuabaMatches = () => {
    return fetch(queryString2)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        const filteredData = result.data.filter(entry => entry.attributes.teamHome.data.attributes.name === 'Eisbuaba Adelberg' || entry.attributes.teamAway.data.attributes.name === 'Eisbuaba Adelberg');
        setMatches(filteredData)
      })
      .catch((error) => {
        console.error('Error fetching matches:', error);
        // You can handle the error here, such as displaying an error message to the user
      });
  };

  // Function to handle button click
  const switchSortOrderMatchesDesc = () => {    
    setSortOrderMatches('desc');
  };
  const switchSortOrderMatchesAsc = () => {    
    setSortOrderMatches('asc');
  };
  const switchSortOrderEventsDesc = () => {    
    setSortOrderEvents('desc');
  };
  const switchSortOrderEventsAsc = () => {    
    setSortOrderEvents('asc');
  };

  // We want fetchEvents() to be executed everytime sortOrderEvents changes
  useEffect(() => {
    fetchEvents();
  }, [sortOrderEvents]);
  // We want fetchEisbuabaMatches() to be executed everytime sortOrderMatches changes
  useEffect(() => {
    fetchEisbuabaMatches();
  }, [sortOrderMatches]);
  
  return (
    <div className='body-bg'>

      <Header currentPage={"schedule"}/>
      
      <div className='flex-grow-1'>

        <div className="tiles-container pb-0">
          <h1 className="mb-2">Termine</h1>
          <div className="hstack gap-3">
            <button type="button" class="btn btn-light" onClick={switchSortOrderEventsDesc}><i class="bi bi-arrow-up pe-2"/>Neueste zuerst</button>
            <button type="button" class="btn btn-light" onClick={switchSortOrderEventsAsc}><i class="bi bi-arrow-down pe-2"/>Älteste zuerst</button>
          </div>
          {!events ? <LoadingSpinner message={"Lade Termine..."}/> : <EventList events={events} showLinkedPosts={true}/>}
          <h1 className="my-2">Spiele</h1>
          <div className="hstack gap-3">
            <button type="button" class="btn btn-light" onClick={switchSortOrderMatchesDesc}><i class="bi bi-arrow-up pe-2"/>Neueste zuerst</button>
            <button type="button" class="btn btn-light" onClick={switchSortOrderMatchesAsc}><i class="bi bi-arrow-down pe-2"/>Älteste zuerst</button>
          </div>
          {!matches ? <LoadingSpinner message={"Lade Matches..."}/> : <MatchList matches={matches}/>}
        </div>

      </div>

      <Footer/>
      
    </div>
  )
}

export default Schedule