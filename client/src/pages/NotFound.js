// client/src/pages/NotFound.js

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function NotFound() {
  return (
    <div className='body-bg'>

      <Header currentPage={null}/>

      <div className='flex-grow-1'>
      404 Not Found
      </div>   

      <Footer/>
      
    </div>
  )
}

export default NotFound