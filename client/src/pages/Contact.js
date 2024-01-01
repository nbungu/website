// client/src/pages/Contact.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from "../components/LoadingSpinner";
import { STRAPI_CMS_URL, PUBLIC_URL, getInitials } from '../utils/Utils.js';

import shareImg from '../assets/share-image.webp'
import { Link } from "react-router-dom";

function Contact() {
  
    // Returns all posts including media data sorted by date
    const queryString = STRAPI_CMS_URL + "/api/managers?populate=thumbnail";

    // GET Request to STRAPI server (backend) at endpoint /api/posts
    const [managers, setManagers] = useState(null);

    const fetchManagers = () => {
        return fetch(queryString)
        .then((response) => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((result) => setManagers(result.data))
        .catch((error) => {
            console.error('Error fetching managers:', error);
            // You can handle the error here, such as displaying an error message to the user
        });
    };
    const updateMetaTags = () => {
        // Update Open Graph meta tags dynamically
        document.title = "Kontakt > Eisbuaba Adelberg";
        document.querySelector('meta[property="og:title"]').setAttribute('content', "Kontakt > Eisbuaba Adelberg");
        document.querySelector('meta[property="og:description"]').setAttribute('content', 'Kontaktpersonene und Anfahrt');
        document.querySelector('meta[property="og:url"]').setAttribute('content', 'https://www.eisbuaba-adelberg.de/kontakt');
        document.querySelector('meta[property="og:type"]').setAttribute('content', 'website');
        document.querySelector('meta[property="og:image"]').setAttribute('content', PUBLIC_URL + shareImg);
        document.querySelector('meta[property="og:image:width"]').setAttribute('content', '1024');
        document.querySelector('meta[property="og:image:height"]').setAttribute('content', '512');
      };

  // We want fetchCarouselBanners() to be executed everytime App component loads
  useEffect(() => {
    fetchManagers();
    updateMetaTags();
  }, []);

  return (
    <div className='body-bg'>

        <Header currentPage={"contact"}/>

        <div className='flex-grow-1'>

        <p class="lead">
              <Link to={'/'} class="btn btn-lg btn-light border-white bg-white m-3">Zurück zur Homepage</Link>
            </p>

            <div className="tiles-container-flex-sm">                
                <div className="fixed-tile gap-3">
                    <h2>Verein</h2>
                    <div className="container-flex">
                        
                        <div className="col">
                            <div className="vstack gap-1 mb-3">
                                <p>1. Athletiksportverein Schlichten e.V.</p>
                                <p>Grabäckerstr. 5</p>
                                <p>73614 Schorndorf-Schlichten</p>
                            </div>

                            <div class="input-group flex-nowrap mb-3">
                                <span class="input-group-text"><i class="bi bi-envelope"/></span>
                                <span class="input-group-text w-100">eis-buaba@asv-schlichten.de</span>
                            </div>
                            <div class="input-group flex-nowrap">
                                <span class="input-group-text"><i class="bi bi-globe2"/></span>
                                <span class="input-group-text w-100"><a className="text-start text-primary" href="https://asv-schlichten.de/">https://asv-schlichten.de</a></span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="fixed-tile gap-3">
                    <h2>Kontaktpersonen</h2>
                    
                    {!managers ? <LoadingSpinner message={"Lade Personen..."}/> :
                    <div className="list-group w-100">
                        {managers.map((manager) => (
                        <div className="list-group-item list-group-item-action p-2" aria-current="true">
                            <div className="hstack">
                                {manager.attributes.thumbnail.data ? <img class="contact-circle me-4 ms-3" src={manager.attributes.thumbnail.data.attributes.url} alt="Contact Thumbnail"/> : <div className="contact-circle me-4 ms-3"><h3 className="text-light">{getInitials(manager.attributes.name)}</h3></div>}
                                <div className="vstack text-start">
                                    <h3>{manager.attributes.name}</h3>
                                    {manager.attributes.role && <p className="opacity-75">{manager.attributes.role}</p>}
                                    {manager.attributes.mail && <p><i class="bi bi-envelope pe-2"/>{manager.attributes.mail}</p>} 
                                    {manager.attributes.infotext && <p className='text-primary'><i class="bi bi-info-circle pe-2"/>{manager.attributes.infotext}</p>}
                                </div>
                            </div>
                            
                        </div>))}
                    </div>
                    }

                </div>
            </div>
            <div className="tiles-container pt-0">
                <div className="fixed-tile gap-3">
                    <h2>Spielstätte: Eishalle Adelberg</h2>
                    <iframe className="rounded border" title='gmaps' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2630.0969993759145!2d9.590841277508565!3d48.76094390755783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799a4d635e283d3%3A0x2eaf24183c07214d!2sEishalle%20Adelberg!5e0!3m2!1sde!2sde!4v1695582753695!5m2!1sde!2sde" width="100%" height="480px, 100" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>

        <Footer/>
        
    </div>      
  )
}

export default Contact