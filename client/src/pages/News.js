// client/src/pages/News.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsTile from '../components/NewsTile';
import LoadingSpinner from '../components/LoadingSpinner';

import { usePosts } from "../utils/fetchContent";

function News() {

  const maxNumberOfPosts = 50;
  const [sortOrder, setSortOrder] = useState('desc');
  const posts = usePosts(maxNumberOfPosts, sortOrder);

  // Function to handle button click
  const switchSortOrderDesc = () => {    
    setSortOrder('desc');
  };
  const switchSortOrderAsc = () => {    
    setSortOrder('asc');
  };

  // We want updateMetaTags() to be executed everytime App component initially loads
  useEffect(() => {
    document.title = "News > Eisbuaba Adelberg";
  }, []);
  
  return (
    <div className='body-bg'>
      
      <Header currentPage={"news"}/>

      <div className="flex-grow-1">

        <div className="tiles-container col1 pb-0">
          <h1 className="mb-2">Alle Beiträge</h1>

          <div className="hstack gap-3">
            <button type="button" className="btn btn-light" onClick={switchSortOrderDesc}><i className="bi bi-arrow-up pe-2"/>Neueste zuerst</button>
            <button type="button" className="btn btn-light" onClick={switchSortOrderAsc}><i className="bi bi-arrow-down pe-2"/>Älteste zuerst</button>
          </div>
        </div>

        {!posts ? <LoadingSpinner message={"Lade News..."}/> :
          <div className="tiles-container col3">
            {posts.map((post) => (
              <NewsTile newsPost={post}/>
            ))}
          </div>
        }
      </div>

      <Footer/>

    </div>
  )
}

export default News