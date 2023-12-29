// client/src/components/PlayerPill.js

import React from 'react';
import { getInitials } from '../utils/Utils.js';

function PlayerPill({ player, colorTheme }) {
  
  return (
    <span class={"badge d-flex align-items-center p-1 pe-2 bg-"+colorTheme+"-subtle border border-"+colorTheme+"-subtle rounded-pill"}>
      {player.attributes.thumbnail?.data ? <img class="rounded-circle" width="56" height="56" src={player.attributes.thumbnail.data.attributes.url} alt="Player Thumbnail"/> : <div className="contact-circle"><h3 className="text-light">{getInitials(player.attributes.name)}</h3></div>}
            
      <div className='vstack text-start gap-2 my-auto'>
        <p className={'text-'+colorTheme+'-emphasis mx-2'}>{player.attributes.name}</p>
        {player.attributes.positionDetailed && <p className={'text-'+colorTheme+'-emphasis opacity-50 mx-2'}>{player.attributes.positionDetailed}</p>}
      </div>   
      {player.attributes.jerseynumber > 0 && <h2 className={'mx-1'}>{'#'+player.attributes.jerseynumber}</h2>}
    </span>
  )
}

export default PlayerPill