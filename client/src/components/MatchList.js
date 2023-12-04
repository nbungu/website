// client/src/components/MatchList.js

import React from 'react';
import { STRAPI_CMS_URL } from '../utils/Utils';


function MatchList({ matches }) {
    
    return (
        <div className="list-group w-100">
            {
                matches.map((match) => (
                    <div className="list-group-item list-group-item-action p-2" aria-current="true">
                        
                        <div class="container-flex">              

                            <div class="row align-items-center justify-content-between pt-1">

                                <div class="col text-center">
                                    <img className="rounded-circle mx-auto" src={STRAPI_CMS_URL + match.attributes.teamHome.data.attributes.logo.data.attributes.url} width={40} height={40} alt='Home Team Logo'/>
                                    <p>{match.attributes.teamHome.data.attributes.name}</p>
                                </div>

                                <div class="col text-center">
                                    {!match.attributes.hasFinished &&
                                        <div class="row align-items-top justify-content-center pb-1">
                                            <div className='col-auto'>
                                                <span className="badge rounded-pill bg-primary">{'Anpfiff ' + match.attributes.faceoffTime.slice(11,16)}</span>
                                            </div>
                                        </div>
                                    }
                                    {match.attributes.hasFinished ? <h1>{match.attributes.goalsHome} - {match.attributes.goalsAway}</h1> : <h1 className='pb-4'>vs.</h1>}
                                    
                                    {match.attributes.hasFinished && <p className='pb-2'>Beendet</p>}
                                </div>

                                <div class="col text-center">
                                    <img className="rounded-circle mx-auto" src={STRAPI_CMS_URL + match.attributes.teamAway.data.attributes.logo.data.attributes.url} width={40} height={40} alt='Away Team Logo'/>
                                    <p>{match.attributes.teamAway.data.attributes.name}</p>
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