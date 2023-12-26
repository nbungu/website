// client/src/pages/Youth.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { STRAPI_CMS_URL } from '../utils/Utils.js';
import LoadingSpinner from "../components/LoadingSpinner";
import EventList from "../components/EventList.js";

import defaultImg from '../assets/default-image.webp'

function Youth({ onPostClicked }) {

        // Returns all posts including media data sorted by date
        const queryString1 = STRAPI_CMS_URL + "/api/people?filters[function][$contains]=nachwuchs";
        const queryString2 = STRAPI_CMS_URL + "/api/events/6?populate=*";
        const queryString3 = STRAPI_CMS_URL + "/api/teams?filters[active][$eq]=true&populate=*";

        // GET Request to STRAPI server (backend) at endpoint /api/posts
        const [people, setPeople] = useState(null);
        const [event, setEvent] = useState(null);
        const [teams, setTeams] = useState(null);

        const fetchPeople = () => {
            return fetch(queryString1)
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
        const fetchTeams = () => {
            return fetch(queryString3)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((result) => setTeams(result.data))
              .catch((error) => {
                console.error('Error fetching teams:', error);
                // You can handle the error here, such as displaying an error message to the user
              });
          };
        const fetchEvent = () => {
            return fetch(queryString2)
            .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
            .then((result) => setEvent([result.data]))
            .catch((error) => {
            console.error('Error fetching events:', error);
            // You can handle the error here, such as displaying an error message to the user
            });
        };
    
    // We want fetchCarouselBanners() to be executed everytime App component loads
    useEffect(() => {
    fetchPeople();
    fetchEvent();
    fetchTeams();
    }, []);

    return (
        <div className='body-bg'>

        <Header currentPage={null}/>

        {/* BREADCRUMBS */}
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

        {/* VOTING */}
        <div class="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabindex="-1" role="dialog" id="modalTour">
          <div class="modal-dialog" role="document">
              <div class="modal-content rounded-4 shadow">
              <div class="modal-body p-5">
                  <h2 class="fw-bold mb-0">Wer gewinnt den Cup?</h2>

                  <div class="list-group d-grid gap-4 my-5">
                    {!teams ? <LoadingSpinner message={"Lade Teams..."}/> :
                      teams.map((team) => (
                        <label class="list-group-item d-flex gap-3 border-0">
                        <input class="form-check-input flex-shrink-0 my-auto mx-4 fs-4" type="radio" name="listGroupRadios" id="listGroupRadios1" value=""/>
                        <div className="hstack gap-3">
                            <img className="rounded-circle" src={!team.attributes.logo.data ? defaultImg : (STRAPI_CMS_URL + team.attributes.logo.data.attributes.url)} alt="Team Logo"/>
                            <h3 className="text-start">{team.attributes.name}</h3>
                        </div>
                        </label>
                      ))
                    }
                  </div>

                  <button type="button" class="btn btn-lg btn-primary mt-5 w-100" data-bs-dismiss="modal">jetzt abstimmen</button>
              </div>
              </div>
          </div>
        </div>

        <div class="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabindex="-1" role="dialog" id="modalTour">
            <div class="modal-dialog" role="document">
                <div class="modal-content rounded-4 shadow">
                <div class="modal-body p-5">
                    <h2 class="fw-bold mb-0">Wer gewinnt den Cup?</h2>

                    <div class="list-group d-grid gap-4 my-5">
                        <label class="list-group-item d-flex gap-3 border-0">
                            <input class="form-check-input flex-shrink-0 my-auto mx-4 fs-4" type="radio" name="listGroupRadios" id="listGroupRadios1" value=""/>
                            <div className="hstack gap-3">
                                <img className="rounded-circle" width='64' height='64' src={defaultImg} alt="Team Logo"/>
                                <h3 className="text-start">Eisbuaba-Adelberg</h3>
                            </div>
                        </label>
                        <label class="list-group-item d-flex gap-3 border-0">
                            <input class="form-check-input flex-shrink-0 my-auto mx-4 fs-4" type="radio" name="listGroupRadios" id="listGroupRadios1" value=""/>
                            <div className="hstack gap-3">
                                <img className="rounded-circle" width='64' height='64' src={defaultImg} alt="Team Logo"/>
                                <h3 className="text-start">Eisbuaba-Adelberg</h3>
                            </div>
                        </label>
                    </div>

                    <button type="button" class="btn btn-lg btn-primary mt-5 w-100" data-bs-dismiss="modal">jetzt abstimmen</button>
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

        {/* OLD JUMBOTRON */}
        <div class="container my-5">
          <div class="p-5 text-center bg-body-tertiary rounded-3 video-bg">
            <img className='bi mt-4 mb-3' width={96} height={96} alt="Eisbuaba-Cup Logo"/>
            <h1 className="mb-2">Eisbuaba Cup 2024</h1>
            <p class="col-lg-8 mx-auto fs-5 text-muted">
              Ein Eishockey-Turnier für Hobby-Mannschaften aus der Region. Der 'Eisbuaba Cup 2024' verspricht packende Action, bierliga Eishockey und jede Menge Unterhaltung. Nach einer Gruppenphase wird der Gewinner im Playoff-Modus ermittelt. Die Matchdauer beträgt 2 x 10 Minuten. <a href="/kontakt">Team Anmeldung</a> bis zum 21.02.2024 möglich.
            </p>
            <div class="d-inline-flex gap-2 mt-4 mb-5">
              <button class="d-inline-flex align-items-center btn btn-danger btn-lg px-4 rounded-pill" type="button">
                Livestream
                <i className="bi bi-youtube ps-2 fs-4"/>
              </button>
              <button class="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button">
                Spielplan
                <i className="bi bi-file-earmark-arrow-down ps-2"/>
              </button>
            </div>

            {!event ? <LoadingSpinner message={"Lade Termin..."}/> : <div className="my-4"><EventList events={event} onPostClicked={onPostClicked}/></div>}

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
                <div class="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center flex-shrink-0 me-3">
                    <i class="bi bi-0-square-fill fs-1"></i>
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