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


function EventList({ events }) {
    
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
        <div className="d-flex flex-column flex-md-row p-3 gap-4 align-items-center justify-content-center">        
            <div className="list-group">
                {
                    events.map((entry) => (
                        <div className="list-group-item list-group-item-action py-3" aria-current="true">
                            <div className='row'>
                                <div className='col-sm-2'>
                                    <img src={getIcon(entry.attributes.type)}/>
                                </div>
                                <div className='col-sm-10'>
                                    <div className='row'>
                                        <div className='col-6 text-start'>
                                            <h6 className="mb-0">{entry.attributes.type}</h6>
                                            <p className="mb-0 opacity-75">{entry.attributes.startingtime.slice(0, -7)} - {entry.attributes.endtime.slice(0, -7)} Uhr</p>
                                        </div>
                                        <div className='col-6 text-end'>
                                            <h6 className="text-nowrap mb-0">{formatDate(entry.attributes.date)}</h6>
                                            <p className="text-nowrap mb-0 opacity-75">{entry.attributes.location}</p>
                                        </div>
                                        <div className='col-12 text-start'>
                                            <p className='text-primary'>{entry.attributes.text}</p>
                                        </div>
                                        <div className='col-12 text-end'>
                                            <Link className='btn btn-light' to="/news"><i className="bi bi-arrow-right pe-2"/>Zum Artikel</Link>
                                        </div>              
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default EventList

/**

<a href="/" className="list-group-item list-group-item-action d-flex gap-4 py-3" aria-current="true">
                        <i className="bi bi-arrow-repeat fs-2" style={{color: 'cornflowerblue'}}></i>
                        <div className="d-flex gap-5 w-100 justify-content-between">
                            <div>
                                <h6 className="text-start mb-0">{entry.attributes.type}</h6>
                                <p className="text-start mb-0 opacity-75">{entry.attributes.startingtime.slice(0, -7)} - {entry.attributes.endtime.slice(0, -7)} Uhr</p>
                            </div>
                            <div>
                                <h6 className="text-nowrap text-end mb-0">{formatDate(entry.attributes.date)}</h6>
                                <p className="text-nowrap text-end mb-0 opacity-75">{entry.attributes.location}</p>
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

 */