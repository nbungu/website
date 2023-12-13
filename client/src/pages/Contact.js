// client/src/pages/Contact.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { STRAPI_CMS_URL } from '../utils/Utils.js';
import LoadingSpinner from "../components/LoadingSpinner";

function Contact() {
  
    // Returns all posts including media data sorted by date
    const queryString = STRAPI_CMS_URL + "/api/people";

    // GET Request to STRAPI server (backend) at endpoint /api/posts
    const [people, setPeople] = useState(null);

    const fetchPeople = () => {
        return fetch(queryString)
        .then((response) => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((result) => setPeople(result.data))
        .catch((error) => {
            console.error('Error fetching featured posts:', error);
            // You can handle the error here, such as displaying an error message to the user
        });
    };

  // We want fetchCarouselBanners() to be executed everytime App component loads
  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className='body-bg'>

        <Header currentPage={"contact"}/>

        <div className='flex-grow-1'>

            <div className="tiles-container-flex-sm">                
                <div className="fixed-tile">
                    <h2>Verein</h2>
                    <div className="vstack gap-2 p-3">
                        <div className="text-start">1. Athletiksportverein Schlichten e.V.</div>
                        <div className="text-start">Grabäckerstr. 5</div>
                        <div className="text-start">73614 Schorndorf-Schlichten</div>
                        <div className="border-bottom"/>
                        
                        <i class="text-start bi bi-globe2"><a className="text-start ps-2" href="https://asv-schlichten.de/">www.asv-schlichten.de</a></i>
                        <i class="text-start bi bi-envelope-at"><a className="text-start ps-2">info@asv-schlichten.de</a></i>
                        
                        
                    </div>
                </div>
                <div className="fixed-tile">
                    <h2>Kontaktpersonen</h2>
                    
                    {!people ? <LoadingSpinner message={"Lade Personen..."}/> :
                    <div className="vstack gap-2 p-3">
                        {people.map((person) => (
                        <div className="border rounded">
                            <div>{person.attributes.name}</div>
                            <div>{person.attributes.function}</div>
                            <div>{person.attributes.mail}</div>
                        </div>
                        ))}
                    </div>
                    }


                </div>
            </div>
            <div className="tiles-container pt-0">
                <div className="fixed-tile">
                    <h2>Spielstätte: Eishalle Adelberg</h2>
                    <iframe className="mt-3 rounded border" title='gmaps' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2630.0969993759145!2d9.590841277508565!3d48.76094390755783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799a4d635e283d3%3A0x2eaf24183c07214d!2sEishalle%20Adelberg!5e0!3m2!1sde!2sde!4v1695582753695!5m2!1sde!2sde" width="100%" height="480px, 100" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>

        <Footer/>
        
    </div>      
  )
}

export default Contact