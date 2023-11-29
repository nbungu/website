// client/src/components/LoadingSpinner.js

import React from 'react';

function LoadingSpinner({ message }) {
  
  return (

    <div>
        <div class="d-flex justify-content-center">
          <div class={message ? "spinner-border mx-5 mt-5 mb-3" : "spinner-border m-5"} aria-hidden="true"/>
        </div>
        {message ?
          <div class="d-flex justify-content-center mb-5">
            <div className=''>{message}</div>
          </div>
          :
          <div/>
        }
        
    </div>
    
  
  )
}

export default LoadingSpinner

/*

    <div class="d-flex justify-content-center">
      <div class="spinner-border mx-auto m-5" aria-hidden="true"></div>
      
    </div>

*/