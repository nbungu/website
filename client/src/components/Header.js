// client/src/components/Header.js

import React from 'react';
import { Link } from "react-router-dom";

import logo from "../assets/header-logo.svg";

function Header({ currentPage }) {
    
    const active = 'btn btn-light rounded-pill my-2 px-4 border border-primary border-bottom-0';
    const regular = 'btn btn-light rounded-pill my-2 px-4 border-0 glass-effect';
    //{currentPage === "news" ? active : regular}

    return (
    <div className="header-bg bg-zig-zag">

        <div className='container-flex'>

            <div className='row align-items-center my-1'>
                
                <div className='col-auto'>
                    <Link to="/" className='d-flex align-items-center text-decoration-none'>
                        <img className="header-logo" src={logo} alt="logo"/>
                        <h1>Eisbuaba Adelberg</h1>
                    </Link>
                </div>
                

                <div className="col-auto">
                    <div className='row'>
                    
                    <div className='col text-center'>
                        <Link to="/" className={currentPage === "home" ? active : regular}><h2>Home</h2></Link>
                    </div>
                    <div className='col text-center'>
                        <Link to="/news" className={currentPage === "news" ? active : regular}><h2>News</h2></Link>
                    </div>
                    <div className='col text-center'>
                        <Link to="/termine" className={currentPage === "schedule" ? active : regular}><h2>Termine</h2></Link>      
                    </div>
                    <div className='col text-center'>
                        <Link to="/kontakt" className={currentPage === "contact" ? active : regular}><h2>Kontakt</h2></Link>
                    </div>
                        
                    </div>
                             
                        
                </div>

            </div>

        </div>
        
        
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