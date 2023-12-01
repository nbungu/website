// client/src/pages/Youth.js

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import testIcon from "../assets/ice-court.png";
import { Link } from 'react-router-dom';

function Youth() {

  
  return (
    <div className='body-bg'>

      <Header currentPage={null}/>

      <div className='flex-grow-1'>      

        <div className="tiles-container">
          <div className='fixed-tile'>

            <div class="container">
              <div class="row align-items-top justify-content-center">
                <div class="col-sm-2 border">
                  <img src={testIcon}/>
                </div>
                <div class="col-sm-10 border">
                  <div class="row">
                    <div class="col-8 col-sm-6 text-start border">
                      <h6 className="mb-0">Training</h6>
                      <p className="mb-0 opacity-75">16:00 - 17:00 Uhr</p>
                    </div>
                    <div class="col-4 col-sm-6 text-end border">
                      <h6 className="text-nowrap mb-0">20.11.2023</h6>
                      <p className="text-nowrap mb-0 opacity-75">Esslingen</p>
                    </div>
                  </div>
                  <div class="row align-items-center mt-2">
                    <div class="col-8 col-sm-6 text-start border">
                      <p className='text-primary'>vs. Wernau</p>
                    </div>
                    <div class="col-4 col-sm-6 text-end border">
                      <Link className='btn btn-light' to="/news"><i className="bi bi-arrow-right pe-2"/>Zum Artikel</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div> 

      <Footer/>

    </div>
  )
}

export default Youth

/**

<div className='row border'>
                <div className='col-sm-2'>
                    <img src={testIcon}/>
                </div>
                <div className='col-sm-10'>
                    <div className='row'>
                        <div className='col-6 text-start'>
                            <h6 className="mb-0">Training</h6>
                            <p className="mb-0 opacity-75">16:00 - 17:00 Uhr</p>
                        </div>
                        <div className='col-6 text-end'>
                            <h6 className="text-nowrap mb-0">20.11.2023</h6>
                            <p className="text-nowrap mb-0 opacity-75">Esslingen</p>
                        </div>
                        <div className='col-12 text-start'>
                            <p className='text-primary'>vs. Wernau</p>
                        </div>
                        <div className='col-12 text-end'>
                            <Link className='btn btn-light' to="/news"><i className="bi bi-arrow-right pe-2"/>Zum Artikel</Link>
                        </div>              
                    </div>
                </div>
            </div>


 */