// client/src/pages/Schedule.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventList from '../components/EventList';
import LoadingSpinner from '../components/LoadingSpinner';
import { STRAPI_CMS_URL } from '../utils/Utils.js';
import MatchList from "../components/MatchList.js";

function Schedule() { 
  
  const [sortOrder, setSortOrder] = useState('asc');
  const [events, setEvents] = useState(null);
  const [matches, setMatches] = useState(null);

  // fetches the last two most recent posts in sorted order
  const queryString = STRAPI_CMS_URL + "/api/events?populate=*&sort=date:" + sortOrder;
  const queryString2 = STRAPI_CMS_URL + "/api/matches?populate[teamHome][populate][0]=logo&populate[teamAway][populate][0]=logo&sort=faceoffTime:" + sortOrder;

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
  const fetchMatches = () => {
    return fetch(queryString2)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => setMatches(result.data))
      .catch((error) => {
        console.error('Error fetching matches:', error);
        // You can handle the error here, such as displaying an error message to the user
      });
  };

  // Function to handle button click
  const switchSortOrderDesc = () => {    
    setSortOrder('desc');
  };
  const switchSortOrderAsc = () => {    
    setSortOrder('asc');
  };

  // We want fetchPosts() to be executed everytime App component loads
  useEffect(() => {
    fetchEvents();
    fetchMatches();
  }, [sortOrder]);
  
  return (
    <div className='body-bg'>

      <Header currentPage={"schedule"}/>
      
      <div className='flex-grow-1'>

        <div className="tiles-container pb-0">
          <div className="hstack gap-3">
            <button type="button" class="btn btn-light" onClick={switchSortOrderDesc}><i class="bi bi-arrow-up pe-2"/>Neueste zuerst</button>
            <button type="button" class="btn btn-light" onClick={switchSortOrderAsc}><i class="bi bi-arrow-down pe-2"/>Älteste zuerst</button>
          </div>
        </div>
        
        <div className="tiles-container">

          <div className="fixed-tile gap-3">
            <h2>Termine</h2>
            {!events ? <LoadingSpinner message={"Lade Termine..."}/> : <EventList events={events}/>}            
          </div>
          <div className="fixed-tile gap-3">
            <h2>Matches</h2>
              {!matches ? <LoadingSpinner message={"Lade Matches..."}/> : <MatchList matches={matches}/>}
          </div>

        </div>

      </div>

      <Footer/>
      
    </div>
  )
}

export default Schedule