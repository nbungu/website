// client/src/App.js

import React, { useState } from 'react';

// Custom Style Sheets
import "./App.css";

// Custom Components
import Header from './Header.js';
import Footer from "./Footer.js";
import StartingPage from "./StartingPage.js";
import NewsPage from "./NewsPage.js";
import ContactPage from './ContactPage.js';
import SchedulePage from './SchedulePage.js';

function App() {
  // Usecase: Trigger re-renders of Components if a value changes
  // The 'useState' function returns an array with two elements:
  // the current value and the setter-function.
  // Initial value of 'data' is null
  // use the setter function when changing the value
  const [data, setData] = React.useState(null);

  // GET Request to Node server (backend) at endpoint /api
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const startingPage = <StartingPage/>;
  const newsPage = <NewsPage/>;
  const schedulePage = <SchedulePage/>;
  const contactPage = <ContactPage/>;

  const [page, setPage] = useState("home");

  function switchToPage(pageName) {
    switch (pageName) {
      case "home":
        return startingPage;
      case "news":
        return newsPage;
      case "schedule":
        return schedulePage;
      case "contact":
        return contactPage;
      default:
        return startingPage;
    }
  }

  // React components are JavaScript functions that return markup:
  return (   

    <div className="body-bg">
      <Header setPage={setPage} currentPage={page}/>
      {switchToPage(page)}
      <p className="text-center">{!data ? "Loading..." : data}</p>
      <p className="text-center">{!page ? "Loading..." : page}</p>
      <Footer/>
    </div>

  );
}

// specify the main component in the file
export default App;
