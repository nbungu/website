// client/src/components/EventList.js

import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/Utils';

function EventList({ events }) {
    
    function getIcon(eventType) {
        switch (eventType) {
            case "Training": return "bi bi-arrow-repeat text-success fs-4";
            case "Heimspiel": return "bi bi-house-fill text-secondary fs-4";
            case "Auswärtsspiel": return "bi bi-bus-front-fill text-secondary fs-4";
            case "Trainingslager": return "bi bi-backpack2-fill text-secondary fs-4";
            case "Turnier": return "bi bi-trophy-fill text-warning fs-4";
            case "Eisbuaba-Cup": return "bi bi-trophy-fill text-warning fs-4";
            case "Fest": return "bi bi-cup-straw fs-4";
            default: return "bi bi-question-circle-fill fs-4";
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
                                    <i className={getIcon(event.attributes.type)}/>
                                </div>
                                <div class="col">
                                    <div class="row">
                                        <div class="col text-start">
                                            {event.attributes.date ?
                                                <p className="mb-1 opacity-75">{formatDate(event.attributes.date)}</p> :
                                                event.attributes.type === 'Training' ? <p className="mb-1 opacity-75">regelmäßiger Termin</p> :
                                                <p className="mb-1 opacity-75">-</p>
                                            }
                                            <h3 className="mb-1">{event.attributes.type}</h3>
                                        </div>
                                        <div class="col text-end">
                                            <p className="mb-1 opacity-75"><i class="bi bi-clock-history pe-2"/>{event.attributes.startingtime?.slice(0, -7)} - {event.attributes.endtime?.slice(0, -7)}</p>
                                            <h3 className="mb-1">{event.attributes.location}</h3>
                                        </div>
                                    </div>
                                    <div class="row align-items-top">
                                        {event.attributes.text &&
                                            <div class="col text-start">
                                                <p className='text-primary'><i class="bi bi-info-circle pe-2"/>{event.attributes.text}</p>
                                            </div>
                                        }
                                        {event.attributes.post?.data &&
                                            <div class="col text-end">
                                                <Link to={`/news/${event.attributes.post.data.id}`} className='btn btn-outline-primary btn-sm mt-1'><i className="bi bi-arrow-right pe-2"/>Zum Artikel</Link>
                                            </div>
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