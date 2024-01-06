// client/src/components/PlayerPill.js

import React, { useState } from 'react';
import { STRAPI_CMS_URL, getInitials, getFirstName } from '../utils/Utils.js';
import defaultImg from '../assets/default-image.webp'

function PlayerPill({ player, colorTheme, icon }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const imgPath = player.attributes.thumbnail?.data && STRAPI_CMS_URL + player.attributes.thumbnail.data.attributes.url;

  return (
    <>
      <span className={"player-pill badge p-1 pe-2 bg-"+colorTheme+"-subtle border border-"+colorTheme+"-subtle rounded-pill"} onClick={() => setIsModalOpen(true)}>
        {imgPath ? <img className="player-circle" src={imgPath} alt="Player Thumbnail"/> : <div className="player-circle"><h3 className="text-light">{getInitials(player.attributes.name)}</h3></div>}
              
        <div className='vstack text-start gap-2 my-auto'>
          <p className={'text-'+colorTheme+'-emphasis mx-2'}>{getFirstName(player.attributes.name)}</p>
          {player.attributes.positionDetailed && <p className={'text-'+colorTheme+'-emphasis opacity-50 mx-2'}>{player.attributes.positionDetailed}</p>}
        </div>   

      </span>

      {/* PLAYER POPVER */}
      {isModalOpen &&      
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 shadow">

              <div className={"modal-header border-bottom-0 bg-" + colorTheme + '-subtle rounded-4 rounded-bottom-0'}>
                <h1 className="modal-title fs-5">Spielerkarte</h1>
                <div className='btn py-0 px-2' data-bs-dismiss="modal" aria-label="Close" title='Schließen' onClick={() => setIsModalOpen(false)}>
                  <i className="bi bi-x-lg fs-4"></i>
                </div>
              </div>
              
              <div className="modal-body p-0">

                <div className='row mx-auto'>
                  <div className='col-auto bg-dark px-3 py-4'>
                    <div className='vstack gap-4'>                      
                      <h1 className='fw-bold text-light'><i className={"bi " + icon + ' pe-3'}/>{(player.attributes.jerseynumber ? ('#' + player.attributes.jerseynumber) : (player.attributes.jerseynumber === 0 ? '#00' : '-'))}</h1>
                      <h1 className='text-start text-light'>{player.attributes.position}</h1>
                      <h3 className='text-start text-light opacity-75'>{player.attributes.positionDetailed}</h3>
                    </div>
                  </div>
                  <div className='col p-0'>
                    <img className="img-fluid" src={imgPath ? imgPath : defaultImg} alt="Player Thumbnail Big"/>
                  </div>
                </div> 

                <div className={'row mx-auto justify-content-center align-items-center border-top py-3 bg-' + colorTheme + '-subtle rounded-4 rounded-top-0'}>
                  <div className='col'>
                    <h1>{player.attributes.name}</h1>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      }
    </>
  )
}

export default PlayerPill