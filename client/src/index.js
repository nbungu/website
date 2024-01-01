import React from "react";
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

if (process.env.NODE_ENV === 'production') disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// <App/> is a React component and used as Starting Page (App.js)
export default function App() {
  
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
        <Route path='/news/:id' element={<NewsPost/>}/>
        <Route path="/termine" element={<Schedule/>}/>
        <Route path="/kontakt" element={<Contact/>}/>
        <Route path="/impressum" element={<Impressum />}/>
        <Route path="/eisbuaba-cup-2024" element={<EisbuabaCup2024/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<NotFound/>}/>  
      </Routes>
    </BrowserRouter>
  );
}
