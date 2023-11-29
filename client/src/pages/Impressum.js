// client/src/pages/Impressum.js

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Impressum() {
  return (
    <div className='body-bg d-flex flex-column'>
      <Header currentPage={null}/>
      <div className='flex-grow-1'>
      Impressum...
      </div>   
      <Footer/>
    </div>
  )
}

export default Impressum