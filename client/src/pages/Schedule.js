// client/src/pages/Schedule.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventList from '../components/EventList';
import LoadingSpinner from '../components/LoadingSpinner';
import { STRAPI_CMS_URL } from '../utils/Utils.js';

function Schedule({ onPostClicked }) { 
  
  // fetches the last two most recent posts in sorted order
  const queryString = STRAPI_CMS_URL + "/api/events?populate=*&sort=date";
  const [events, setEvents] = useState(null);

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

  // We want fetchPosts() to be executed everytime App component loads
  useEffect(() => {
    fetchEvents();
  }, []);
  
  return (
    <div className='body-bg'>

      <Header currentPage={"schedule"}/>
      
      <div className='flex-grow-1'>

        <div className="tiles-container">
          
          <div className="fixed-tile gap-3">
            <h2>Termine 1. Mannschaft</h2>
            {!events ? <LoadingSpinner message={"Lade Termine..."}/> : <EventList events={events} onPostClicked={onPostClicked}/>}            
          </div>

        </div>

      </div>

      

      <Footer/>
      
    </div>
  )
}

export default Schedule