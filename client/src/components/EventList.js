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
                events.map((event, index) => (
                    <div className="list-group-item list-group-item-action p-0" aria-current="true" key={index}>
                        <div className="container-flex">
                            <div className="row mx-auto align-items-center p-2">
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
                                    <div className="col text-start">
                                        <p className='text-primary'><i className="bi bi-info-circle pe-2"/>{event.attributes.infotext}</p>
                                    </div>
                                    }
                                </div>
                                {/* EXTENDED INFOS COL */}
                                <div className='d-none d-sm-block col-sm-3 text-center border-start p-1'>
                                    <p><i className="bi bi-clock-history mx-1"></i>{event.attributes.startingtime?.slice(0, -7)} - {event.attributes.endtime?.slice(0, -7)}</p>
                                    <p><i className="bi bi-geo-alt-fill mx-1"></i>{event.attributes.location}</p>
                                    {event.attributes.post?.data && <Link className="icon-link gap-1 icon-link-hover" to={`/news/${event.attributes.post.data.id}`}>Zum Artikel<i className="bi bi-chevron-right"></i></Link>}
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