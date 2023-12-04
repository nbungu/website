// client/src/components/ButtonTile.js

import React from 'react';
import { Link } from 'react-router-dom';

function ButtonTile({ link, icon, iconColor, header, text, span, badgeText}) {
  
  const colSpan = !span ? 1 : span;
  
  return (
    <Link className='button-tile' to={link} style={{gridColumn: 'span ' + colSpan}}>
      {badgeText ? <span className="badge rounded-pill bg-danger">{badgeText}</span> : <div/>}
      <i className={icon} style={{color: !iconColor ? 'cornflowerblue' : iconColor}}/>
      <h2 className='mt-1'>{header}</h2>
      <p className='mt-1'>{text}</p>
    </Link>
  )

}

export default ButtonTile