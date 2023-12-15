// client/src/components/ProgressBar.js

import React from 'react';

function ProgressBar({ currentVal, maxVal }) {
  
  return (
    <div className="progress" style={{ width: '200px', height: '26px'}}>
      <div className="progress-bar" role="progressbar"
        style={{
          width: `${(currentVal || 0) * 100 / maxVal }%`,
        }}
        aria-valuenow={currentVal || 0}
        aria-valuemin="0"
        aria-valuemax={maxVal}>
          <p className='text-end text-light pe-2'>{currentVal}</p>
        </div>
    </div>
  )
}

export default ProgressBar