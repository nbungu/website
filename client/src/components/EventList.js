// client/src/components/EventList.js

import React from 'react';
import { formatDate } from '../utils/Utils';

import training from "../assets/ice-court.png";
import trainingslager from "../assets/arena.png";
import spiel from "../assets/goal-1.png";
import fest from "../assets/arena.png";
import turnier from "../assets/cup.png";
import defaultLogo from "../assets/puck.png"
import { Link } from 'react-router-dom';



function EventList({ events, onPostClicked  }) {
    
    function getIcon(eventType) {
        switch (eventType) {
            case "Training": return training;
            case "Heimspiel": return spiel;
            case "Auswärtsspiel": return spiel;
            case "Trainingslager": return trainingslager;
            case "Turnier": return turnier;
            case "Fest": return fest;
            default: return defaultLogo;
        }        
    }

    return (
        <div className="list-group w-100 pt-3">
            {
                events.map((entry) => (
                    <div className="list-group-item list-group-item-action p-2" aria-current="true">
                        
                        <div class="container-flex">              
                            <div class="row align-items-top">
                                <div class="col-auto ms-2 mt-2">
                                    <img src={getIcon(entry.attributes.type)}/>
                                </div>
                                <div class="col">
                                    <div class="row">
                                        <div class="col text-start">
                                            <p className="mb-1 opacity-75">{formatDate(entry.attributes.date)}</p>
                                            <h3 className="mb-1">{entry.attributes.type}</h3>
                                        </div>
                                        <div class="col text-end">
                                            <p className="mb-1 opacity-75"><i class="bi bi-clock-history pe-2"/>{entry.attributes.startingtime?.slice(0, -7)} - {entry.attributes.endtime?.slice(0, -7)}</p>
                                            <h3 className="mb-1">{entry.attributes.location}</h3>
                                        </div>
                                    </div>
                                    <div class="row align-items-top">
                                        {entry.attributes.text ?
                                            <div class="col text-start">
                                                <p className='text-primary'><i class="bi bi-info-circle pe-2"/>{entry.attributes.text}</p>
                                            </div> : <div/>
                                        }
                                        {entry.attributes.linkedpostid ?
                                            <div class="col text-end">
                                                <Link className='btn btn-outline-primary mt-1' to={`/news/${entry.attributes.linkedpostid}`} onClick={()=>{onPostClicked(entry.attributes.linkedpostid)}} key={entry.attributes.linkedpostid}><i className="bi bi-arrow-right pe-2"/>Zum Artikel</Link>
                                            </div> : <div/>
                                        }                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default EventList

/**

<div className="list-group w-100 py-2">
            {
                events.map((entry) => (
                    <div className="list-group-item list-group-item-action p-2" aria-current="true">
                        
                        <div class="container-flex">              
                            <div class="row align-items-top">
                                <div class="col-sm-2">
                                    <img src={getIcon(entry.attributes.type)}/>
                                </div>
                                <div class="col-sm-10">
                                    <div class="row">
                                        <div class="col-8 col-sm-6 text-start">
                                            <p className="mb-1 opacity-75">{formatDate(entry.attributes.date)}</p>
                                            <h3 className="mb-1">{entry.attributes.type}</h3>
                                        </div>
                                        <div class="col-4 col-sm-6 text-end">
                                            <p className="mb-1 opacity-75"><i class="bi bi-clock-history pe-2"/>{entry.attributes.startingtime.slice(0, -7)} - {entry.attributes.endtime.slice(0, -7)} Uhr</p>
                                            <h3 className="mb-1">{entry.attributes.location}</h3>
                                        </div>
                                    </div>
                                    <div class="row align-items-top">
                                        <div class="col-8 col-sm-6 text-start">
                                            {entry.attributes.text ? <p className='opacity-75 text-primary'><i class="bi bi-info-circle pe-2"/>{entry.attributes.text}</p> : <div/>}
                                        </div>
                                        <div class="col-4 col-sm-6 text-end">
                                            {entry.attributes.linkedpostid ? <Link className='btn btn-primary btn-sm mt-1' to="/news"><i className="bi bi-arrow-right pe-2"/>Zum Artikel</Link> : <div/>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>

 */