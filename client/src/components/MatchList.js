// client/src/components/MatchList.js

import React from 'react';
import { STRAPI_CMS_URL, formatDate } from '../utils/Utils';
import { Link } from 'react-router-dom';

function MatchList({ matches, showExtendedInfos }) {
    
    return (
        <div className="list-group w-100">
            {
                matches.map((match) => (
                    <div className='list-group-item list-group-item-action p-2' aria-current="true">
                        
                        <div class="container-flex">              

                            <div class="row mx-auto align-items-center justify-content-between">
                                {/* HOME TEAM COL */}
                                <div class="col text-center">
                                    <img className="rounded-circle test-img-square mx-auto" src={STRAPI_CMS_URL + match.attributes.teamHome.data.attributes.logo.data.attributes.url} alt='Home Team Logo'/>
                                    <h3 className='d-none d-sm-block pt-2'>{match.attributes.teamHome.data.attributes.name}</h3>
                                    <h3 className='d-sm-none pt-2'>{match.attributes.teamHome.data.attributes.shortname}</h3>
                                </div>
                                {/* CENTER COL */}
                                <div class="col-auto text-center">
                                    <p className={showExtendedInfos ? 'd-sm-none opacity-75 pb-2' : 'opacity-75 pb-2'}>{formatDate(match.attributes.faceoffTime.slice(0,10))}</p>
                                    {match.attributes.hasFinished ? <h1>{match.attributes.goalsHome} - {match.attributes.goalsAway}</h1> : <h1>vs.</h1>}
                                    <div class="row align-items-top justify-content-center pt-2">
                                        <div className='col-auto'>
                                            {!match.attributes.hasFinished ?
                                                <span className="badge rounded-pill bg-light text-primary">{'Anpfiff ' + match.attributes.faceoffTime.slice(11,16)}</span> :
                                                <span class="badge rounded-pill text-bg-warning opacity-75">Beendet</span>
                                            }
                                        </div>
                                    </div>                                    
                                </div>
                                {/* AWAY TEAM COL */}
                                <div class="col text-center">
                                    <img className="rounded-circle test-img-square mx-auto" src={STRAPI_CMS_URL + match.attributes.teamAway.data.attributes.logo.data.attributes.url} alt='Away Team Logo'/>
                                    <h3 className='d-none d-sm-block pt-2'>{match.attributes.teamAway.data.attributes.name}</h3>
                                    <h3 className='d-sm-none pt-2'>{match.attributes.teamAway.data.attributes.shortname}</h3>
                                </div>

                                {showExtendedInfos && 
                                <div class="d-none d-sm-block col-sm-3 text-center bg-light border rounded p-3">
                                    <p><i class="bi bi-calendar-week mx-1"></i>{formatDate(match.attributes.faceoffTime.slice(0,10))}</p>
                                    <p><i class="bi bi-geo-alt-fill mx-1"></i>{match.attributes.location}</p>
                                    {match.attributes.post?.data && <Link to={`/news/${match.attributes.post.data.id}`} className='btn btn-outline-primary mt-2'><i className="bi bi-arrow-right pe-2"/>Spielbericht</Link>}
                                </div>}
                            </div>
                            {match.attributes.infotext && 
                                <div class="row align-items-center pt-1">
                                    <div className='col-12 text-start'>
                                        <p className='text-primary'><i class="bi bi-info-circle pe-2"/>{match.attributes.infotext}</p>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default MatchList 

/*

    <div class="col text-center">
        <div className='score-decor-r ps-4 py-3'> 
            <img className="rounded-circle test-img-square mx-auto" src={STRAPI_CMS_URL + match.attributes.teamAway.data.attributes.logo.data.attributes.url} alt='Away Team Logo'/>
            <h3 className='d-none d-sm-block pt-2'>{match.attributes.teamAway.data.attributes.name}</h3>
            <h3 className='d-sm-none pt-2'>{match.attributes.teamAway.data.attributes.shortname}</h3>
        </div>
    </div>


        // Function to handle button click
    const setBg = (goalsHome, goalsAway, hasFinished) => {    
        if (!hasFinished) return ''
        if (goalsHome > goalsAway) return 'match-bg-home-win'
        else if (goalsHome < goalsAway) return 'match-bg-home-loose'
        else if (goalsHome === goalsAway) return 'match-bg-draw'
        else return 'match-bg-draw'
    };
    //+ setBg(match.attributes.goalsHome, match.attributes.goalsAway, match.attributes.hasFinished)

*/