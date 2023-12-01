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
        <div className="list-group w-100">
            {
                events.map((event) => (
                    <div className="list-group-item list-group-item-action p-2" aria-current="true">
                        
                        <div class="container-flex">              
                            <div class="row align-items-top">
                                <div class="col-auto ms-2 mt-2">
                                    <img src={getIcon(event.attributes.type)}/>
                                </div>
                                <div class="col">
                                    <div class="row">
                                        <div class="col text-start">
                                            <p className="mb-1 opacity-75">{formatDate(event.attributes.date)}</p>
                                            <h3 className="mb-1">{event.attributes.type}</h3>
                                        </div>
                                        <div class="col text-end">
                                            <p className="mb-1 opacity-75"><i class="bi bi-clock-history pe-2"/>{event.attributes.startingtime?.slice(0, -7)} - {event.attributes.endtime?.slice(0, -7)}</p>
                                            <h3 className="mb-1">{event.attributes.location}</h3>
                                        </div>
                                    </div>
                                    <div class="row align-items-top">
                                        {event.attributes.text ?
                                            <div class="col text-start">
                                                <p className='text-primary'><i class="bi bi-info-circle pe-2"/>{event.attributes.text}</p>
                                            </div> : <div/>
                                        }
                                        {event.attributes.post?.data ?
                                            <div class="col text-end">
                                                <Link className='btn btn-outline-primary mt-1' to={`/news/${event.attributes.post.data.id}`} onClick={()=>{onPostClicked(event.attributes.post.data.id)}} key={event.attributes.post.data.id}><i className="bi bi-arrow-right pe-2"/>Zum Artikel</Link>
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
                events.map((event) => (
                    <div className="list-group-item list-group-item-action p-2" aria-current="true">
                        
                        <div class="container-flex">              
                            <div class="row align-items-top">
                                <div class="col-sm-2">
                                    <img src={getIcon(event.attributes.type)}/>
                                </div>
                                <div class="col-sm-10">
                                    <div class="row">
                                        <div class="col-8 col-sm-6 text-start">
                                            <p className="mb-1 opacity-75">{formatDate(event.attributes.date)}</p>
                                            <h3 className="mb-1">{event.attributes.type}</h3>
                                        </div>
                                        <div class="col-4 col-sm-6 text-end">
                                            <p className="mb-1 opacity-75"><i class="bi bi-clock-history pe-2"/>{event.attributes.startingtime.slice(0, -7)} - {event.attributes.endtime.slice(0, -7)} Uhr</p>
                                            <h3 className="mb-1">{event.attributes.location}</h3>
                                        </div>
                                    </div>
                                    <div class="row align-items-top">
                                        <div class="col-8 col-sm-6 text-start">
                                            {event.attributes.text ? <p className='opacity-75 text-primary'><i class="bi bi-info-circle pe-2"/>{event.attributes.text}</p> : <div/>}
                                        </div>
                                        <div class="col-4 col-sm-6 text-end">
                                            {event.attributes.linkedpostid ? <Link className='btn btn-primary btn-sm mt-1' to="/news"><i className="bi bi-arrow-right pe-2"/>Zum Artikel</Link> : <div/>}
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