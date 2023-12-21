// client/src/pages/About.js

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function About() {
  return (
    <div className='body-bg'>

      <Header currentPage={'about'}/>

      <div className='flex-grow-1'>
      Team...
      </div>   

      <Footer/>
      
    </div>
  )
}

export default About