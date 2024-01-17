// client/src/pages/News.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsTile from '../components/NewsTile';
import LoadingSpinner from '../components/LoadingSpinner';

import { usePosts } from "../utils/fetchContent";

function News() {

  const [isFirstState, setIsFirstState] = useState(true);

  const paginationLimit = 50;
  const sortOrder = "desc";
  const { posts, reversedPosts } = usePosts(paginationLimit, sortOrder);

  const switchSortOrder = () => {  
    setIsFirstState(!isFirstState);
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
          <div className="row w-100 mx-auto">
            <button type="button" className="col-auto btn btn-light" onClick={switchSortOrder}><i className={isFirstState ? 'bi bi-arrow-down pe-2' : 'bi bi-arrow-up pe-2'}/>{isFirstState ? 'Zeige älteste zuerst' : 'Zeige neueste zuerst'}</button>
          </div>
        </div>

        {!posts ? <LoadingSpinner message={"Lade News..."}/> :
          <div className="tiles-container col3">
            {(isFirstState ? posts : reversedPosts).map((post, index) => (
              <NewsTile newsPost={post} key={index}/>
            ))}
          </div>
        }
      </div>

      <Footer/>

    </div>
  )
}

export default News