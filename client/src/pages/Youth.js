// client/src/pages/Youth.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { STRAPI_CMS_URL } from '../utils/Utils.js';
import LoadingSpinner from "../components/LoadingSpinner";

function Youth() {

        // Returns all posts including media data sorted by date
        const queryString = STRAPI_CMS_URL + "/api/people?filters[function][$contains]=nachwuchs";

        // GET Request to STRAPI server (backend) at endpoint /api/posts
        const [people, setPeople] = useState(null);
    
        const fetchPeople = () => {
            return fetch(queryString)
            .then((response) => {
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => setPeople(result.data))
            .catch((error) => {
                console.error('Error fetching featured posts:', error);
                // You can handle the error here, such as displaying an error message to the user
            });
        };
    
    // We want fetchCarouselBanners() to be executed everytime App component loads
    useEffect(() => {
    fetchPeople();
    }, []);
  
    return (
        <div className='body-bg'>

        <Header currentPage={null}/>

        <div class="list-group">
            <label class="list-group-item d-flex gap-2">
            <input class="form-check-input flex-shrink-0" type="radio" name="listGroupRadios" id="listGroupRadios1" value=""/>
            <span>
                First radio
                <small class="d-block text-body-secondary">With support text underneath to add more detail</small>
            </span>
            </label>
            <label class="list-group-item d-flex gap-2">
            <input class="form-check-input flex-shrink-0" type="radio" name="listGroupRadios" id="listGroupRadios2" value=""/>
            <span>
                Second radio
                <small class="d-block text-body-secondary">Some other text goes here</small>
            </span>
            </label>
            <label class="list-group-item d-flex gap-2">
            <input class="form-check-input flex-shrink-0" type="radio" name="listGroupRadios" id="listGroupRadios3" value=""/>
            <span>
                Third radio
                <small class="d-block text-body-secondary">And we end with another snippet of text</small>
            </span>
            </label>
        </div>

        <div class="container my-5">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-chevron p-3 bg-body-tertiary rounded-3">
                <li class="breadcrumb-item">
                    <a class="link-body-emphasis" href="#">
                    <i class="bi bi-house-door-fill"></i>
                    <span class="visually-hidden">Home</span>
                    </a>
                </li>
                <li class="breadcrumb-item">
                    <a class="link-body-emphasis fw-semibold text-decoration-none" href="#">Library</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Data
                </li>
                </ol>
            </nav>    
        </div>

        <div class="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabindex="-1" role="dialog" id="modalTour">
            <div class="modal-dialog" role="document">
                <div class="modal-content rounded-4 shadow">
                <div class="modal-body p-5">
                    <h2 class="fw-bold mb-0">Wer gewinnt den Cup?</h2>

                    <ul class="d-grid gap-4 my-5 list-unstyled small">
                    <li class="d-flex gap-4">
                        <svg class="bi text-body-secondary flex-shrink-0" width="48" height="48"></svg>
                        <div>
                        <h5 class="mb-0">Grid view</h5>
                        Not into lists? Try the new grid view.
                        </div>
                    </li>
                    <li class="d-flex gap-4">
                        <svg class="bi text-warning flex-shrink-0" width="48" height="48"></svg>
                        <div>
                        <h5 class="mb-0">Bookmarks</h5>
                        Save items you love for easy access later.
                        </div>
                    </li>
                    <li class="d-flex gap-4">
                        <svg class="bi text-primary flex-shrink-0" width="48" height="48"></svg>
                        <div>
                        <h5 class="mb-0">Video embeds</h5>
                        Share videos wherever you go.
                        </div>
                    </li>
                    </ul>
                    <button type="button" class="btn btn-lg btn-primary mt-5 w-100" data-bs-dismiss="modal">Great, thanks!</button>
                </div>
                </div>
            </div>
            </div>

        <div class="my-5">
            <div class="p-5 text-center bg-body-tertiary">
                <div class="container py-5">
                <h1 class="text-body-emphasis">Full-width jumbotron</h1>
                <p class="col-lg-8 mx-auto lead">
                    This takes the basic jumbotron above and makes its background edge-to-edge with a <code>.container</code> inside to align content. Similar to above, it's been recreated with built-in grid and utility classes.
                </p>
                </div>
            </div>
        </div>

        <div className="container">
          <div class="row mb-2">
            <div class="col-md-6">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text-primary-emphasis">World</strong>
                  <h3 class="mb-0">Featured post</h3>
                  <div class="mb-1 text-body-secondary">Nov 12</div>
                  <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
                    Continue reading
                    <i class="bi bi-chevron-right"></i>
                  </a>
                </div>
                <div class="col-auto d-none d-lg-block">
                  <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <strong class="d-inline-block mb-2 text-success-emphasis">Design</strong>
                  <h3 class="mb-0">Post title</h3>
                  <div class="mb-1 text-body-secondary">Nov 11</div>
                  <p class="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
                    Continue reading
                    <i class="bi bi-chevron-right"></i>
                  </a>
                </div>
                <div class="col-auto d-none d-lg-block">
                  <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                </div>
              </div>
            </div>
          </div>

        </div>


        <div class="container px-4 py-5" id="hanging-icons">
            <h2 class="pb-2 border-bottom">Hanging icons</h2>
            <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
            <div class="col d-flex align-items-start">
                <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    <i class="bi bi-0-square-fill"></i>
                </div>
                <div>
                <h3 class="fs-2 text-body-emphasis">Featured title</h3>
                <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                <a href="#" class="btn btn-primary">
                    Primary button
                </a>
                </div>
            </div>
            <div class="col d-flex align-items-start">
                <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    <i class="bi bi-0-square-fill"></i>
                </div>
                <div>
                <h3 class="fs-2 text-body-emphasis">Featured title</h3>
                <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                <a href="#" class="btn btn-primary">
                    Primary button
                </a>
                </div>
            </div>
            <div class="col d-flex align-items-start">
                <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    <i class="bi bi-0-square-fill"></i>
                </div>
                <div>
                <h3 class="fs-2 text-body-emphasis">Featured title</h3>
                <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                <a href="#" class="btn btn-primary">
                    Primary button
                </a>
                </div>
            </div>
            </div>
        </div>

        <div className='flex-grow-1'>      

            <div className='tiles-container'>

                <div className="tiles-container-flex-sm">                
                    <div className="fixed-tile">
                        <h2>Infos</h2>
                        <div className="vstack gap-2 p-3">
                            <div className="text-start">1. Athletiksportverein Schlichten e.V.</div>
                            <div className="text-start">Grabäckerstr. 5</div>
                            <div className="text-start">73614 Schorndorf-Schlichten</div>
                            <div className="border-bottom"/>
                            
                            <i class="text-start bi bi-globe2"><a className="text-start ps-2" href="https://asv-schlichten.de/">www.asv-schlichten.de</a></i>
                            <i class="text-start bi bi-envelope-at"><a className="text-start ps-2">info@asv-schlichten.de</a></i>
                            
                        </div>
                    </div>

                    <div className="fixed-tile">
                        <h2>Kontaktpersonen</h2>
                                                
                        <div className="vstack gap-2 p-3">
                            
                            <div className="border rounded">
                                <div>Name Nachname</div>
                                <div>Trainer Nachwuchs</div>
                                <div>txt</div>
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