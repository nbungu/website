// client/src/components/NewsList.js

import React from 'react';
import { formatPublishedAt } from '../utils/Utils';
import { Link } from 'react-router-dom';

function NewsList({ newsPosts, onPostClicked }) { 
    
    return (
        <div className="d-flex flex-column flex-md-row p-2 gap-4 align-items-center justify-content-center">
              <div className="list-group">

                {
                    newsPosts.map((post) => (

                    <Link to={`/news/${post.id}`} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={()=>{onPostClicked(post.id)}} key={post.attributes.title}>
                        <div className="d-flex gap-2 w-100 justify-content-between">
                            <div>
                                <h6 className="text-start mb-0">{post.attributes.title}</h6>
                            </div>
                            <small className="opacity-50 text-nowrap">{formatPublishedAt(post.attributes.publishedAt)}</small>
                        </div>
                    </Link>

                ))}
                
            </div>
        </div>
    )
}

export default NewsList