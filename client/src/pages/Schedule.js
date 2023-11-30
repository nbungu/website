// client/src/pages/Schedule.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventList from '../components/EventList';
import LoadingSpinner from '../components/LoadingSpinner';
import { STRAPI_CMS_URL } from '../utils/Utils.js';

function Schedule() { 
  
  // fetches the last two most recent posts in sorted order
  const queryString = STRAPI_CMS_URL + "/api/events";
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
          
          <div className="fixed-tile">
            <h2>Termine 1. Mannschaft</h2>
            {!events ? <LoadingSpinner message={"Lade Termine..."}/> : <EventList events={events}/>}            
          </div>

          <div className="fixed-tile">
            <h2>Termine Nachwuchs</h2>
            <div className="d-flex flex-column flex-md-row p-2 gap-4 align-items-center justify-content-center">
              <div className="list-group">
                  <a href="/news" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <i className="bi bi-calendar2-week-fill" style={{fontSize: '1.5rem', color: 'cornflowerblue'}}></i>                  
                    <div className="d-flex gap-2 w-100 justify-content-between">
                      <div>
                        <h6 className="mb-0">List group item heading</h6>
                        <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                      </div>
                      <small className="opacity-50 text-nowrap">now</small>
                    </div>
                  </a>
                  <a href="/news" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <i className="bi bi-calendar2-week-fill" style={{fontSize: '1.5rem', color: 'cornflowerblue'}}></i>
                    <div className="d-flex gap-2 w-100 justify-content-between">
                      <div>
                        <h6 className="mb-0">Another title here</h6>
                        <p className="mb-0 opacity-75">Some placeholder content in a paragraph that goes a little longer so it wraps to a new line.</p>
                      </div>
                      <small className="opacity-50 text-nowrap">3d</small>
                    </div>
                  </a>
                  <a href="/news" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <i className="bi bi-calendar2-week-fill" style={{fontSize: '1.5rem', color: 'cornflowerblue'}}></i>
                    <div className="d-flex gap-2 w-100 justify-content-between">
                      <div>
                        <h6 className="mb-0">Third heading</h6>
                        <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                      </div>
                      <small className="opacity-50 text-nowrap">1w</small>
                    </div>
                  </a>
                </div>
            </div>
          </div>
        </div>

      </div>

      

      <Footer/>
      
    </div>
  )
}

export default Schedule