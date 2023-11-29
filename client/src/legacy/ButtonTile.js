// client/src/ButtonTile.js

import React from 'react';

function ButtonTile({ header, text, icon }) {

  return (
    <div>
      <button className='btn' type='button'>
        <i className={icon} style={{fontSize: '2rem', color: 'cornflowerblue'}}></i>
        <h2>{header}</h2>
        <p>{text}</p>
      </button>        
    </div>
  )
}

export default ButtonTile