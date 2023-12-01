// client/src/pages/EisbuabaCup2024.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventList from '../components/EventList';
import LoadingSpinner from '../components/LoadingSpinner';
import { STRAPI_CMS_URL } from '../utils/Utils.js';

function EisbuabaCup2024({ onPostClicked }) {
  
    // fetches the last two most recent posts in sorted order
    const queryString = STRAPI_CMS_URL + "/api/events/6?populate=*";
    const [event, setEvent] = useState(null);
  
    const fetchEvent = () => {
      return fetch(queryString)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => setEvent([result.data]))
        .catch((error) => {
          console.error('Error fetching events:', error);
          // You can handle the error here, such as displaying an error message to the user
        });
    };
  
    // We want fetchPosts() to be executed everytime App component loads
    useEffect(() => {
      fetchEvent();
    }, []);

  return (
    <div className='body-bg'>

      <Header currentPage={null}/>

      <div className='flex-grow-1'>

        <div className="tiles-container-flex">

           <div className="fixed-tile">
            <h1>Eisbuaba Cup 2024</h1>
            <p>tbd Teams</p>
            <p>tbd Tabelle</p>
            <p>tbd Anmeldung</p>
          </div> 
          <div className="fixed-tile gap-3">
            <h2>Wann?</h2>
            {!event ? <LoadingSpinner message={"Lade Termine..."}/> : <EventList events={event} onPostClicked={onPostClicked}/>}            
            <h2>Wo?</h2>
            <iframe className="rounded border" title='gmaps' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2630.0969993759145!2d9.590841277508565!3d48.76094390755783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799a4d635e283d3%3A0x2eaf24183c07214d!2sEishalle%20Adelberg!5e0!3m2!1sde!2sde!4v1695582753695!5m2!1sde!2sde" width="100%" height="400px, 100" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          
        </div>   
        <div className="tiles-container">
            <div className="fixed-tile">
              <h2>tbd bilder gallerie</h2>
            </div>
        </div>

      </div>      

      <Footer/>
      
    </div>
  )
}

export default EisbuabaCup2024