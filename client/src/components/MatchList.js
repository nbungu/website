// client/src/components/MatchList.js

import React from 'react';
import { STRAPI_CMS_URL, formatDate } from '../utils/Utils';


function MatchList({ matches }) {
    
    // Function to handle button click
    const setBg = (goalsHome, goalsAway, hasFinished) => {    
        if (!hasFinished) return ''
        if (goalsHome > goalsAway) return 'match-bg-home-win'
        else if (goalsHome < goalsAway) return 'match-bg-home-loose'
        else if (goalsHome === goalsAway) return 'match-bg-draw'
        else return 'match-bg-draw'
    };

    return (
        <div className="list-group w-100">
            {
                matches.map((match) => (
                    <div className={'list-group-item list-group-item-action p-2 '+ setBg(match.attributes.goalsHome, match.attributes.goalsAway, match.attributes.hasFinished)} aria-current="true">
                        
                        <div class="container-flex">              

                            <div class="row align-items-center justify-content-between">

                                <div class="col text-center">
                                    <img className="rounded-circle test-img-square mx-auto" src={STRAPI_CMS_URL + match.attributes.teamHome.data.attributes.logo.data.attributes.url} alt='Home Team Logo'/>
                                    <h3 className='d-none d-sm-block pt-2'>{match.attributes.teamHome.data.attributes.name}</h3>
                                    <p className='d-sm-none pt-1'>{match.attributes.teamHome.data.attributes.shortname}</p>
                                </div>

                                <div class="col text-center">
                                <p className='opacity-75 pb-2'>{formatDate(match.attributes.faceoffTime.slice(0,10))}</p>
      
                                    {match.attributes.hasFinished ? <h1>{match.attributes.goalsHome} - {match.attributes.goalsAway}</h1> : <h1>vs.</h1>}
                                    
                                    {match.attributes.hasFinished && <p className='pb-2'>Beendet</p>}

                                    {!match.attributes.hasFinished &&
                                        <div class="row align-items-top justify-content-center pt-2">
                                            <div className='col-auto'>
                                                <span className="badge rounded-pill bg-light text-secondary">{'Anpfiff ' + match.attributes.faceoffTime.slice(11,16)}</span>
                                            </div>
                                        </div>
                                    }
                                </div>

                                <div class="col text-center">
                                    <img className="rounded-circle test-img-square mx-auto" src={STRAPI_CMS_URL + match.attributes.teamAway.data.attributes.logo.data.attributes.url} alt='Away Team Logo'/>
                                    <h3 className='d-none d-sm-block pt-2'>{match.attributes.teamAway.data.attributes.name}</h3>
                                    <p className='d-sm-none pt-1'>{match.attributes.teamAway.data.attributes.shortname}</p>
                                </div>
                            </div>
                            {match.attributes.infotext && 
                                <div class="row align-items-center pt-2">
                                    <div className='col-12 text-center'>
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
        <p>{formatDate(match.attributes.date)}</p>
        <p>{match.attributes.startingTime.slice(0, -7)}</p>
    </div>


*/