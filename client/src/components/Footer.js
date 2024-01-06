// client/src/Footer.js

import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { copyTextToClipboard } from '../utils/Utils.js';
import asvFavicon from '../assets/asv-schlichten-favicon.ico'

function Footer() {
  
  const [isCopied, setIsCopied] = useState(false);
  const instaLink = 'https://www.instagram.com/';
  const youtubeLink = 'https://www.youtube.com/';
  const copyText = 'eis-buaba@asv-schlichten.de';

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="px-5 py-2 z-3">
     
      <ul className="nav justify-content-center border-bottom border-secondary px-0 py-3">
        <li className="nav-item">
          <Link to="/impressum" className="nav-link text-body-secondary">Impressum</Link>
        </li>
      </ul>

      <div className="row align-items-center m-0">
        <div className='col-sm-3'></div>
        <div className="col-md-6 px-0 py-3 text-center">
          <p className='text-body-secondary'>© 2024 Eisbuaba Adelberg</p>
          <a href='https://www.asv-schlichten.de/' className='text-body-secondary'><img src={asvFavicon} height={24} alt="ASV Schlichten Wappen" className='m-2'/>ASV-Schlichten</a>
        </div>
        <div className="col-md-3 text-center">
          
            <a href={instaLink ? instaLink : '#'} className="btn btn-secondary rounded-circle ms-2 p-2 lh-1" title="Instagram"><i className="bi bi-instagram"/></a>
            <a href={youtubeLink ? youtubeLink : '#'} className="btn btn-secondary rounded-circle ms-2 p-2 lh-1" title="YouTube"><i className="bi bi-youtube"/></a>
            <button type="button" onClick={handleCopyClick} className="btn btn-secondary rounded-circle ms-2 p-2 lh-1" title="Email-Addresse kopieren"><i className={isCopied ? "bi bi-clipboard-check" : "bi bi-envelope-at"}/></button>
          
        </div>
      </div>

    </div>
  )
}

export default Footer