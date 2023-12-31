// client/src/pages/NotFound.js

import React from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function NotFound() {
   
  return (
    <div className='body-bg'>

        <div class="container d-flex w-100 h-100 p-3 mx-auto my-auto flex-column">

          <div class="px-3 text-center">
            <h1>Diese Seite konnte nicht gefunden werden!</h1>
            <p class="lead">Keine Sorge, hier gehts weiter zur Startseite der Eisbuaba Adelberg.</p>
            <p class="lead">
              <Link to={'/'} class="btn btn-lg btn-light border-white bg-white m-3">Zurück zur Homepage</Link>
            </p>
          </div>
        </div>

      <Footer/>
      
    </div>
  )
}

export default NotFound