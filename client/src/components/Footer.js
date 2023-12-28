// client/src/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import asvFavicon from '../assets/asv-schlichten-favicon.ico'


function Footer() {
  
  return (
    <div className="px-5 py-2 z-3">

      <ul className="nav justify-content-center border-bottom border-secondary px-0 py-3">
        <li className="nav-item">
          <Link to="/impressum" className="nav-link text-body-secondary">Impressum</Link>
        </li>
      </ul>

      <div class="row align-items-center m-0">
        <div className='col-sm-3'></div>
        <div class="col-md-6 px-0 py-3 text-center">
          <p className='text-body-secondary'>© 2023 Eisbuaba Adelberg</p>
          <a href='https://www.asv-schlichten.de/' className='text-body-secondary'><img src={asvFavicon} height={24} alt="ASV Schlichten Wappen" className='m-2'/>ASV-Schlichten</a>
        </div>
        <div class="col-md-3 text-center">
          <div>
            <button type="button" className="btn btn-secondary rounded-circle ms-2 p-2 lh-1"><i className="bi bi-instagram"/></button>
            <button type="button" className="btn btn-secondary rounded-circle ms-2 p-2 lh-1"><i className="bi bi-facebook"/></button>
            <button type="button" className="btn btn-secondary rounded-circle ms-2 p-2 lh-1"><i className="bi bi-envelope-at"/></button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Footer