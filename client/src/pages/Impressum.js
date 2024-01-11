// client/src/pages/Impressum.js

import React, { useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import RichTextBlocks from "../components/RichTextBlocks";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { useImpressum } from "../utils/fetchContent";

function Impressum() {
  
  const pageContent = useImpressum();

  // We want fetchPageContent() to be executed everytime App component loads
  useEffect(() => {
    document.title = "Impressum > Eisbuaba Adelberg";
  }, []);
  
  return (
    <div className='body-bg'>

      <Header currentPage={null}/>

      <div className='flex-grow-1'>

        <div className="tiles-container col1">
              
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