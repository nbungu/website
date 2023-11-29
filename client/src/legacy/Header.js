// client/src/Header.js

import React, { useState } from 'react';
import logo from "./logo.svg";

function Header({ setPage, currentPage }) {
    
    const [isClicked, setIsClicked] = useState(false);

    function handleClick(page) {
        setPage(page); // SetPage function is referenced from Parent Component
        setIsClicked(!isClicked); // Toggle the clicked state
    };
    
    return (
    <div className="navbar d-flex flex-wrap align-items-center justify-content-center justify-content-md-between header-bg">

        <a href={'/home'} className="col-md-3 d-flex align-items-center mb-md-0 text-dark text-decoration-none">
            <img src={logo} alt="logo" style={{maxHeight: '56px', margin: '8px'}}/>
            <h1 className="title">Eisbuaba Adelberg</h1>
        </a>

        <ul className="col-md-auto col-12 nav nav-pills justify-content-center mb-md-0">
            <button onClick={e => setPage(e.target.value)} value={"home"} type="button" className="btn btn-primary m-2">Home</button>
            <button onClick={e => setPage(e.target.value)} value={"news"} type="button" className="btn btn-outline-primary m-2">News</button>
            <button onClick={e => setPage(e.target.value)} value={"schedule"} type="button" className="btn btn-outline-primary m-2">Termine</button>
            <button onClick={e => handleClick(e.target.value)} value={"contact"} type="button" className="btn btn-outline-primary m-2">Kontakt</button>
        </ul>

        <div className="col-md-3 text-end px-3">
            <div className="d-flex justify-content-end">
                <div className="p-2">
                    <button type="button" className="btn btn-secondary rounded-circle p-2 lh-1">
                        <i className="bi bi-instagram"></i>
                    </button>
                </div>
                <div className="p-2">
                    <button type="button" className="btn btn-secondary rounded-circle p-2 lh-1">
                        <i className="bi bi-facebook"></i>
                    </button>
                </div>
                <div className="p-2">
                    <button type="button" className="btn btn-secondary rounded-circle p-2 lh-1">
                        <i className="bi bi-envelope-at"></i>
                    </button>
                </div>
            </div>
        </div>
      </div>
  )
}

export default Header