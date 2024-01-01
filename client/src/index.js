import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from '@fvilers/disable-react-devtools'; 

// Styling
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import './App.css';

// Components
import Home from './pages/Home';
import News from './pages/News';
import Schedule from './pages/Schedule';
import Contact from './pages/Contact';
import Impressum from './pages/Impressum';
import EisbuabaCup2024 from './pages/EisbuabaCup2024';
import NotFound from './pages/NotFound';
import About from './pages/About';
import NewsPost from "./components/NewsPost";
import { STRAPI_CMS_URL } from "./utils/Utils";

if (process.env.NODE_ENV === 'production') disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// <App/> is a React component and used as Starting Page (App.js)
export default function App() {
 
  // Usecase: Trigger re-renders of Components if a value changes
  // The 'useState' function returns an array with two elements:
  // the current value and the setter-function.
  // Initial value of 'newsPostId' is 'null'
  // use the setter function when changing the value
  
  const [postIds, setPostIds] = useState(null);
  const maxCount = 200;

  // useEffect with an empty dependency array ('[]'), will run once,
  // immediately after the component is mounted (after the first render of the component)
  useEffect(() => {
    async function fetchAllPostIds() {
      return fetch(STRAPI_CMS_URL + '/api/posts?fields[0]=id&pagination[pageSize]='+maxCount)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        const arrayOfIds = result.data.map(item => item.id);
        setPostIds(arrayOfIds)})
      .catch((error) => {
        console.error('Error fetching post ids:', error);
        // You can handle the error here, such as displaying an error message to the user
      });
    }
    fetchAllPostIds();
  }, []);

  
  /*
  React Router is meant for internal navigation (client-side-routing) within your application
  and can only redirect to internal routes.

  Trying to access a dynamic route like /posts/postTitleXY, directly from the browser (server-side-routing) doesnt work.
  -> Implement SSR (server-side-routing)
  */

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/news" element={<News/>}/>
        {postIds && postIds.map((id) => (
          <Route path={`/news/${id}`} element={<NewsPost postId={id}/>}/>
        ))}
        <Route path="/termine" element={<Schedule/>}/>
        <Route path="/kontakt" element={<Contact/>}/>
        <Route path="/impressum" element={<Impressum />}/>
        <Route path="/eisbuaba-cup-2024" element={<EisbuabaCup2024/>}/>
        <Route path="/about" element={<About />}/>
      </Routes>
    </BrowserRouter>
  );
}

/**

  NotFound Route in the END!
  <Route path="/*" element={<NotFound/>}/>


<Route path="/news/:id" element={<NewsPost postId={newsPostId}/>}/>
<Route path="/*" element={<Home onPostClicked={setNewsPostId} />}/>        
 */
