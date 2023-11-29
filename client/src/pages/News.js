// client/src/pages/News.js

import React, { useState, useEffect } from "react";

import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsTile from '../components/NewsTile';
import LoadingSpinner from '../components/LoadingSpinner';
import { STRAPI_CMS_URL } from '../utils/Utils.js';

function News({ onPostClicked }) {
  
  const [posts, setPosts] = useState(null);
  const [counter, setCounter] = useState(6); // Initial State for the counter: Show 9 Posts

  // Returns all posts including media data sorted by date
  const queryString = STRAPI_CMS_URL + "/api/posts?sort=publishedAt:desc&populate=*&pagination[start]=0&pagination[limit]=" + counter;

  // GET Request to STRAPI server (backend) at endpoint /api/posts
  const fetchPosts = () => {
    return fetch(queryString)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => setPosts(result.data))
      .catch((error) => {
        console.error('Error fetching featured posts:', error);
        // You can handle the error here, such as displaying an error message to the user
      });
  };

  // Function to handle button click
  const showMorePosts = () => {    
    setCounter(counter + 4); // Show 6 more posts
  };

  // We want fetchPosts() to be executed everytime App component loads
  // The effect will run whenever the 'counter' state changes
  useEffect(() => {
    fetchPosts();
  }, [counter]);
  
  return (
    <div className='body-bg d-flex flex-column'>
      
      <Header currentPage={"news"}/>

      <div className="flex-grow-1">
        {!posts ? <LoadingSpinner message={"Lade News..."}/> :
          <div className="tiles-container-flex">
            {posts.map((post) => (
              <NewsTile newsPost={post} onPostClicked={onPostClicked}/>
            ))}
          </div>
        }
      </div>

      <div className="row mx-auto p-3">
        <button className="btn btn-secondary" onClick={showMorePosts}><i class="bi bi-arrow-repeat pe-2"/>Mehr News laden</button>
      </div>

      <Footer/>

    </div>
  )
}

export default News