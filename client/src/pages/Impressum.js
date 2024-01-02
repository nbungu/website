// client/src/pages/Impressum.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';

import { STRAPI_CMS_URL, PUBLIC_URL } from '../utils/Utils';
import RichTextBlocks from "../components/RichTextBlocks";
import LoadingSpinner from "../components/LoadingSpinner";
import shareImg from '../assets/share-image.webp'

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
    document.querySelector('meta[property="og:type"]').setAttribute('content', 'website');
    document.querySelector('meta[property="og:image"]').setAttribute('content', PUBLIC_URL + shareImg);
    document.querySelector('meta[property="og:image:width"]').setAttribute('content', '1024');
    document.querySelector('meta[property="og:image:height"]').setAttribute('content', '512');
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