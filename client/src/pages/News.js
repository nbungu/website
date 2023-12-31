// client/src/pages/News.js

import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsTile from '../components/NewsTile';
import LoadingSpinner from '../components/LoadingSpinner';
import { STRAPI_CMS_URL } from '../utils/Utils.js';

function News() {
  
  const [posts, setPosts] = useState(null);
  const [totalNrOfPosts, setTotalNrOfPosts] = useState(0);
  const [sortOrder, setSortOrder] = useState('desc');
  const [counter, setCounter] = useState(6); // Initial State for the counter: Show 9 Posts

  // Returns all posts including media data sorted by date
  const queryString = STRAPI_CMS_URL + "/api/posts?sort=publishedAt:"+sortOrder+"&populate=*&pagination[start]=0&pagination[limit]=" + counter;

  // GET Request to STRAPI server (backend) at endpoint /api/posts
  const fetchPosts = () => {
    return fetch(queryString)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {setPosts(result.data); setTotalNrOfPosts(result.meta.pagination.total)})
      .catch((error) => {
        console.error('Error fetching featured posts:', error);
        // You can handle the error here, such as displaying an error message to the user
      });
  };

  // Function to handle button click
  const showMorePosts = () => {    
    setCounter(counter + 4); // Show 6 more posts
  };
  // Function to handle button click
  const switchSortOrderDesc = () => {    
    setSortOrder('desc');
  };
  const switchSortOrderAsc = () => {    
    setSortOrder('asc');
  };
  const updateMetaTags = () => {
    // Update Open Graph meta tags dynamically
    document.title = "News > Eisbuaba Adelberg";
    document.querySelector('meta[property="og:title"]').setAttribute('content', "News > Eisbuaba Adelberg");
    document.querySelector('meta[property="og:description"]').setAttribute('content', 'News Übersicht');
    document.querySelector('meta[property="og:url"]').setAttribute('content', 'https://www.eisbuaba-adelberg.de/news');
    document.querySelector('meta[property="og:type"]').setAttribute('content', 'website');
  };

  // We want fetchPosts() to be executed everytime 'counter' and the 'sortOrder' state changes
  useEffect(() => {
    fetchPosts();
  }, [counter, sortOrder]);

  // We want updateMetaTags() to be executed everytime App component initially loads
  useEffect(() => {
    updateMetaTags();
  }, []);
  
  return (
    <div className='body-bg'>
      
      <Header currentPage={"news"}/>

      <div className="flex-grow-1">

        <div className="tiles-container pb-0">
          <h1 class="mb-2">Alle Beiträge</h1>

          <div className="hstack gap-3">
            <button type="button" class="btn btn-light" onClick={switchSortOrderDesc}><i class="bi bi-arrow-up pe-2"/>Neueste zuerst</button>
            <button type="button" class="btn btn-light" onClick={switchSortOrderAsc}><i class="bi bi-arrow-down pe-2"/>Älteste zuerst</button>
          </div>
        </div>

        {!posts ? <LoadingSpinner message={"Lade News..."}/> :
          <div className="tiles-container-flex">
            {posts.map((post) => (
              <NewsTile newsPost={post}/>
            ))}
          </div>
        }
      </div>

      {totalNrOfPosts > counter ?
        <div className="row mx-auto p-3">
          <button className="btn btn-secondary" onClick={showMorePosts}><i class="bi bi-arrow-repeat pe-2"/>Mehr News laden</button>
        </div>
        :
        <div/>
      }

      <Footer/>

    </div>
  )
}

export default News