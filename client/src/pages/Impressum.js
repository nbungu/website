// client/src/pages/Impressum.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';

import { STRAPI_CMS_URL } from '../utils/Utils';
import RichTextBlocks from "../components/RichTextBlocks";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

function Impressum() {
  
  const queryString = STRAPI_CMS_URL + "/api/impressum-page";

  const [pageContent, setPageContent] = useState(null);

  const fetchPageContent = () => {
    return fetch(queryString)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => setPageContent(result.data))
      .catch((error) => {
        console.error('Error fetching page content:', error);
        // You can handle the error here, such as displaying an error message to the user
      });
  };
  const updateMetaTags = () => {
    // Update Open Graph meta tags dynamically
    document.title = "Impressum > Eisbuaba Adelberg";
    document.querySelector('meta[property="og:title"]').setAttribute('content', "Impressum");
    document.querySelector('meta[property="og:description"]').setAttribute('content', 'Impressum, Datenschutzerklärung und Haftungsausschluss');
    document.querySelector('meta[property="og:url"]').setAttribute('content', 'https://eisbuaba-adelberg.de/impressum');
  };

  // We want fetchPageContent() to be executed everytime App component loads
  useEffect(() => {
    fetchPageContent();
    updateMetaTags();
  }, []);
  
  return (
    <div className='body-bg'>

      <Header currentPage={null}/>

      <div className='flex-grow-1'>

        <div className="tiles-container">
              
          <div className="fixed-tile">
            {!pageContent ? <LoadingSpinner message={"Lade Impressum..."}/> : <div className="w-100"><RichTextBlocks richtext={pageContent.attributes.impressum}/></div>}
          </div>

          <div className='fixed-tile'>
            {!pageContent ? <LoadingSpinner message={"Lade Datenschutz und Haftungsausschluss..."}/> : <div className="w-100"><RichTextBlocks richtext={pageContent.attributes.datenschutz}/></div>}
          </div>

          <Link className='btn btn-light' to="/"><i className="bi bi-arrow-left pe-2"/>Zur Startseite</Link>

        </div>


      </div>

      <Footer/>
    </div>
  )
}

export default Impressum

/*
{pageContent.attributes.haftung && <RichTextBlocks richtext={pageContent.attributes.haftung}/>}
*/