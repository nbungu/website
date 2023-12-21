// client/src/pages/Sponsors.js

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Sponsors() {
  return (
    <div className='body-bg'>

      <Header currentPage={'sponsors'}/>

      <div className='flex-grow-1'>
      Sponsoren...
      </div>   

      <Footer/>
      
    </div>
  )
}

export default Sponsors