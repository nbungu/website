// client/src/pages/Youth.js

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Youth() {
  return (
    <div className='body-bg d-flex flex-column'>

      <Header currentPage={null}/>

      <div className='flex-grow-1'>
      Nachwuchs...
      </div> 

      <Footer/>

    </div>
  )
}

export default Youth