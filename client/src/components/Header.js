// client/src/components/Header.js

import React from 'react';
import { Link } from "react-router-dom";

import logo from "../logo.svg";

function Header({ currentPage }) {
    
    const regular = 'nav-link header-link';
    const active = 'nav-link header-link active';    

    return (
    <div className="navbar d-flex flex-wrap align-items-center justify-content-center justify-content-md-between header-bg">

        <Link to="/" className='col-md-3 d-flex align-items-center mb-md-0 text-dark text-decoration-none me-3'>
            <img className="header-logo" src={logo} alt="logo"/>
            <h1 className="header-title">Eisbuaba Adelberg</h1>
        </Link>

        <ul className="col-md-auto col-12 nav nav-underline justify-content-center mb-md-0">
            <li className='nav-item'>
                <Link to="/" className={currentPage === "home" ? active : regular}>Home</Link>
            </li>
            <li className='nav-item'>
                <Link to="/news" className={currentPage === "news" ? active : regular}>News</Link>
            </li>
            <li className='nav-item'>
                <Link to="/termine" className={currentPage === "schedule" ? active : regular}>Termine</Link>
            </li>
            <li className='nav-item'>
                <Link to="/kontakt" className={currentPage === "contact" ? active : regular}>Kontakt</Link>
            </li>
        </ul>

        <div className="col-md-3"/>
        
      </div>
  )
}

export default Header

/*

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

*/