// client/src/components/ButtonTile.js

import React from 'react';
import { Link } from 'react-router-dom';

function ButtonTile({ link, icon, iconColor, header, text, span, badgeText }) {
  
  const colSpan = !span ? 1 : span;

  return (
    <Link className='button-tile tile-link' to={link} style={{gridColumn: 'span ' + colSpan}}>
      {badgeText ? <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{badgeText}</span> : <div></div>}
      <i className={icon} style={{color: !iconColor ? 'cornflowerblue' : iconColor}}></i>
      <h2>{header}</h2>
      <p>{text}</p>
    </Link>
  )
}

export default ButtonTile