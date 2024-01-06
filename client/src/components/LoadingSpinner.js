// client/src/components/LoadingSpinner.js

import React from 'react';

function LoadingSpinner({ message }) {
  
  return (
    <>
        <div className="d-flex justify-content-center">
          <div className={message ? "spinner-border mx-5 mt-5 mb-3" : "spinner-border m-5"} aria-hidden="true"/>
        </div>
        {message ?
          <div className="d-flex justify-content-center mb-5">
            <div className=''>{message}</div>
          </div>
          :
          <div/>
        }
    </>
  )
}

export default LoadingSpinner

/*

    <div className="d-flex justify-content-center">
      <div className="spinner-border mx-auto m-5" aria-hidden="true"></div>
      
    </div>

*/