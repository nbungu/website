// client/src/components/MatchListEntry.js

import React from 'react';
import { STRAPI_CMS_URL, formatDate } from '../utils/Utils';
import { Link } from 'react-router-dom';

function MatchListEntry({ match, showExtendedInfos }) {

    return (

        <div className="list-group-item list-group-item-action p-0" aria-current="true">
                                    
            <div className="container-flex">
                <Link to={match.attributes.post?.data && `/news/${match.attributes.post?.data.id}`} className={`row mx-auto align-items-center justify-content-between text-decoration-none p-2 ${!match.attributes.post?.data && 'pe-none'}`}>
                    
                    <div className="col text-center">
                        <img className="team-logo-circle rounded-3 mx-auto" src={STRAPI_CMS_URL + match.attributes.teamHome.data.attributes.logo.data.attributes.url} alt='Home Team Logo'/>
                        <h3 className='d-none d-sm-block pt-1'>{match.attributes.teamHome.data.attributes.name}</h3>
                        <h3 className='d-sm-none pt-1'>{match.attributes.teamHome.data.attributes.shortname}</h3>
                    </div>
                    
                    <div className="col-auto text-center">
                        <p className={`${showExtendedInfos && 'd-sm-none'} opacity-75 pb-1`}>{formatDate(match.attributes.faceoffTime.slice(0,10))}</p>
                        {match.attributes.hasFinished ? <h1 className='bg-dark text-light p-1 rounded'>{match.attributes.goalsHome} : {match.attributes.goalsAway}</h1> : <h1>vs.</h1>}
                        <div className="row align-items-top justify-content-center pt-2">
                            <div className='col-auto'>
                                {match.attributes.isCancelled ? <span className="badge rounded-pill text-bg-danger opacity-75">Abgesagt</span> : 
                                    (!match.attributes.hasFinished ?
                                        <span className="badge rounded-pill bg-light text-primary">{'Anpfiff ' + match.attributes.faceoffTime.slice(11,16)}</span> :
                                        <span className="badge rounded-pill text-bg-warning opacity-75">Beendet</span>
                                    )
                                }
                            </div>
                        </div>
                    </div>                    
                    
                    <div className="col text-center">
                        <img className="team-logo-circle rounded-3 mx-auto" src={STRAPI_CMS_URL + match.attributes.teamAway.data.attributes.logo.data.attributes.url} alt='Away Team Logo'/>
                        <h3 className='d-none d-sm-block pt-1'>{match.attributes.teamAway.data.attributes.name}</h3>
                        <h3 className='d-sm-none pt-1'>{match.attributes.teamAway.data.attributes.shortname}</h3>
                    </div>
                    
                    {showExtendedInfos && 
                    <div className="d-none d-sm-block col-sm-3 text-center border-start p-1">
                        <p className='opacity-75'>{match.attributes.matchtype}</p>
                        <p><i className="bi bi-calendar-week mx-1"></i>{formatDate(match.attributes.faceoffTime.slice(0,10))}</p>
                        <p><i className="bi bi-geo-alt-fill mx-1"></i>{match.attributes.location}</p>
                        {match.attributes.post?.data && <Link className="icon-link gap-1 icon-link-hover" to={`/news/${match.attributes.post?.data.id}`}>Spielbericht<i className="bi bi-chevron-right"></i></Link>}
                    </div>}
                </Link>                
            </div>

        </div>

    )
}

export default MatchListEntry 
