import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

// Styling
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import "./App.css";

// Components
import Home from './pages/Home';
import News from './pages/News';
import Schedule from './pages/Schedule';
import Contact from './pages/Contact';
import Impressum from './pages/Impressum';
import Membership from './pages/Membership';
import EisbuabaCup2024 from './pages/EisbuabaCup2024';
import Youth from "./pages/Youth";
import NewsPost from "./components/NewsPost";

// <App/> is a React component and used as Starting Page (App.js)
/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);*/

export default function App() {
 
  // Usecase: Trigger re-renders of Components if a value changes
  // The 'useState' function returns an array with two elements:
  // the current value and the setter-function.
  // Initial value of 'nodeServerStatus' is 'offline'
  // use the setter function when changing the value
  const [nodeServerStatus, setNodeServerStatus] = useState("offline");

  // GET Request to NODE server (backend) at endpoint /api
  // Any API requests made from this frontend (localhost:3000) will be proxied to localhost:3001 (node backend)
  // Change Proxy-Settings in client/package.json
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setNodeServerStatus(data.message));
  }, []);

  const [newsPostId, setNewsPostId] = useState(null);
  
  /*
  React Router is meant for internal navigation (client-side-routing) within your application
  and can only redirect to internal routes.

  Trying to access a dynamic route like /posts/postTitleXY, directly from the browser (server-side-routing) doesnt work.
  -> Implement SSR (server-side-routing)
  */

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home nodeServerStatus={nodeServerStatus} onPostClicked={setNewsPostId} />}/>
        <Route path="/news" element={<News onPostClicked={setNewsPostId} />}/>
        <Route path="/news/:id" element={<NewsPost postId={newsPostId}/>}/>
        <Route path="/termine" element={<Schedule onPostClicked={setNewsPostId} />}/>
        <Route path="/kontakt" element={<Contact />}/>
        <Route path="/impressum" element={<Impressum />}/>
        <Route path="/mitgliedschaft" element={<Membership />}/>
        <Route path="/eisbuaba-cup-2024" element={<EisbuabaCup2024 onPostClicked={setNewsPostId}/>}/>
        <Route path="/nachwuchs" element={<Youth />}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
