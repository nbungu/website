// client/src/components/Header.js

import React from 'react';
import { Link } from "react-router-dom";

import logo from "../assets/header-logo.svg";

function Header({ currentPage }) {
    
    const active = 'btn btn-light rounded-pill px-4 border border-secondary';
    const regular = 'btn btn-light rounded-pill px-4 border-0 glass-effect';
    
    //{currentPage === "news" ? active : regular}

    return (
        <header className="navbar navbar-expand-md navbar-light bg-light p-0">
            
            <div className="container header">
    
                {/* Buttons in the center */}
                <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                    
                    {/* Logo on the left */}
                    <img className='header-logo' src={logo} alt="logo"/>

                    <div className="navbar-nav gap-3">
                        <Link to="/" className={currentPage === "home" ? active : regular}><h2>Home</h2></Link>
                        <Link to="/news" className={currentPage === "news" ? active : regular}><h2>News</h2></Link>
                        <Link to="/termine" className={currentPage === "schedule" ? active : regular}><h2>Termine</h2></Link>      
                        <Link to="/kontakt" className={currentPage === "contact" ? active : regular}><h2>Kontakt</h2></Link>
                    </div>
                </div>

                {/* Burger menu on the right for small screens */}
                <div class="dropdown">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-bs-toggle="dropdown" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>

            </div>
        </header>
  )
}

export default Header

/*

<div className="header-bg bg-zig-zag">

        <div className='container-flex'>

            <div className='row align-items-center my-1'>
                
                <div className='col-auto border'>
                    <Link to="/" className='text-decoration-none'>
                        <div className='row align-items-center'>
                            <img className="col-auto border header-logo pe-0" src={logo} alt="logo"/>
                            <h1 className='col border pe-0'>Eisbuaba Adelberg</h1>
                        </div>

                        
                    </Link>
                </div>
                

                <div className="col-auto">
                    <div className='row px-3'>
                    
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

*/