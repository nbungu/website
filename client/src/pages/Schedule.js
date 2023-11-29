// client/src/pages/Schedule.js

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Schedule() {  
  return (
    <div className='body-bg d-flex flex-column'>

      <Header currentPage={"schedule"}/>
      
      <div className='flex-grow-1'>

        <div className="tiles-container">
          
          <div className="fixed-tile">
            <h2>Termine 1. Mannschaft</h2>
              <div className="d-flex flex-column flex-md-row p-2 gap-4 align-items-center justify-content-center">        
                <div className="list-group">
                    <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <i className="bi bi-arrow-repeat" style={{fontSize: '1.5rem', color: 'cornflowerblue'}}></i>
                      <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                          <h6 className="text-start mb-0">Training</h6>
                          <p className="text-start mb-0 opacity-75">19:00 - 21:00 Uhr</p>
                        </div>
                        <div>
                          <h6 className="text-nowrap text-end mb-0">Do, 07.10.2023</h6>
                          <p className="text-nowrap text-end mb-0 opacity-75">Adelberg</p>
                        </div>                      
                      </div>
                    </a>
                    <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <i className="bi bi-arrows-collapse-vertical" style={{fontSize: '1.5rem', color: 'orange'}}></i>
                      <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                          <h6 className="text-start mb-0">Freundschaftsspiel</h6>
                          <p className="text-start mb-0 opacity-75">20:15 - 21:30, Wernau</p>
                        </div>
                        <small className="opacity-50 text-nowrap">Di, 31.10.2023</small>
                      </div>
                    </a>
                    
                  </div>
              </div>
          </div>

          <div className="fixed-tile">
            <h2>Termine Nachwuchs</h2>
            <div className="d-flex flex-column flex-md-row p-2 gap-4 align-items-center justify-content-center">
              <div className="list-group">
                  <a href="/news" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <i className="bi bi-calendar2-week-fill" style={{fontSize: '1.5rem', color: 'cornflowerblue'}}></i>                  
                    <div className="d-flex gap-2 w-100 justify-content-between">
                      <div>
                        <h6 className="mb-0">List group item heading</h6>
                        <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                      </div>
                      <small className="opacity-50 text-nowrap">now</small>
                    </div>
                  </a>
                  <a href="/news" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <i className="bi bi-calendar2-week-fill" style={{fontSize: '1.5rem', color: 'cornflowerblue'}}></i>
                    <div className="d-flex gap-2 w-100 justify-content-between">
                      <div>
                        <h6 className="mb-0">Another title here</h6>
                        <p className="mb-0 opacity-75">Some placeholder content in a paragraph that goes a little longer so it wraps to a new line.</p>
                      </div>
                      <small className="opacity-50 text-nowrap">3d</small>
                    </div>
                  </a>
                  <a href="/news" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <i className="bi bi-calendar2-week-fill" style={{fontSize: '1.5rem', color: 'cornflowerblue'}}></i>
                    <div className="d-flex gap-2 w-100 justify-content-between">
                      <div>
                        <h6 className="mb-0">Third heading</h6>
                        <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                      </div>
                      <small className="opacity-50 text-nowrap">1w</small>
                    </div>
                  </a>
                </div>
            </div>
          </div>
        </div>

      </div>

      

      <Footer/>
      
    </div>
  )
}

export default Schedule