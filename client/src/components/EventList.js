// client/src/components/EventList.js

import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/Utils';

function EventList({ events, showExtendedInfos }) {
    
    function getIcon(eventType) {
        switch (eventType) {
            case "Training": return "bi bi-people-fill text-secondary fs-4";
            case "Nachwuchstraining": return "bi bi-person-arms-up text-secondary fs-4";
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
                            <div class="row mx-auto align-items-center">

                                {/* ICON COL */}
                                <div className='col-auto'>
                                    <i className={getIcon(event.attributes.type)}/>
                                </div>

                                {/* CONTENT COL */}
                                <div className='col'>
                                    {event.attributes.date ?
                                        <p className="mb-1">{formatDate(event.attributes.date)}</p> :
                                        event.attributes.recurringDate ? <p className="mb-1">{'Jeden '+event.attributes.recurringDate}</p> :
                                        <p className="mb-1">-</p>
                                    }
                                    <h3 className="mb-1">{event.attributes.type}</h3>

                                    {event.attributes.infotext &&
                                    <div class="col text-start">
                                        <p className='text-primary'><i class="bi bi-info-circle pe-2"/>{event.attributes.infotext}</p>
                                    </div>
                                    }
                                </div>

                                {/* EXTENDED INFOS COL */}
                                <div className='d-none d-sm-block col-sm-3 text-center bg-light border rounded p-3'>
                                    <p><i class="bi bi-clock-history mx-1"></i>{event.attributes.startingtime?.slice(0, -7)} - {event.attributes.endtime?.slice(0, -7)}</p>
                                    <p><i class="bi bi-geo-alt-fill mx-1"></i>{event.attributes.location}</p>
                                    {event.attributes.post?.data && <Link to={`/news/${event.attributes.post.data.id}`} className='btn btn-outline-primary mt-2'><i className="bi bi-arrow-right pe-2"/>Zum Artikel</Link>}
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