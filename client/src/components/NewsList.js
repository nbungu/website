// client/src/components/NewsList.js

import React from 'react';

function NewsList() {
    
    return (
        <div className="d-flex flex-column flex-md-row p-2 gap-4 align-items-center justify-content-center">
              <div className="list-group">
                <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <h6 className="mb-0">List group item heading</h6>
                            <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                        </div>
                        <small className="opacity-50 text-nowrap">now</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsList