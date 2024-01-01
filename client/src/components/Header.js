// client/src/components/Header.js

import React from 'react';
import { Link } from "react-router-dom";

import headerLogo from "../assets/eisbuaba-logo-192.webp";

function Header({ currentPage }) {
    
    const active = 'btn btn-light rounded-pill px-4 border border-secondary';
    const regular = 'btn btn-light rounded-pill px-4 border-0 glass-effect';

    return (
        <header className="navbar navbar-expand-md navbar-light header-bg p-0">
            
            <div className="container header">

                {/* Logo on the left */}
                <Link to='/'><img className='navbar-brand header-logo' src={headerLogo} alt="Eisbuaba Adelberg Logo" title="Zur Startseite"/></Link>   
                
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">

                    {/* Buttons on the right*/} 
                    <div className="navbar-nav gap-3">
                        <Link to="/" className={currentPage === "home" ? active : regular} title="Zur Startseite"><h2>Home</h2></Link>
                        <Link to="/news" className={currentPage === "news" ? active : regular} title="News-Artikel, Spielberichte..."><h2>News</h2></Link>
                        <Link to="/termine" className={currentPage === "schedule" ? active : regular} title="Events, Spieltermine, Trainingstermine..."><h2>Termine</h2></Link>      
                        <Link to="/about" className={currentPage === "about" ? active : regular} title="1. Mannschaft der Eisbuaba"><h2>Team</h2></Link>
                        <Link to="/kontakt" className={currentPage === "contact" ? active : regular} title="Kontaktpersonen, Anfahrt zur Eishalle"><h2>Kontakt</h2></Link>
                    </div>
                </div>

                {/* Burger menu for small screens */}
                <div class="dropdown dropstart">
                    
                    <button className="navbar-toggler glass-effect" type="button" data-toggle="collapse" data-bs-toggle="dropdown" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <ul class="dropdown-menu glass-effect text-center mx-3">
                        <Link to="/" className='dropdown-item py-3 px-5'><h1>Home</h1></Link>
                        <Link to="/news" className='dropdown-item py-3 px-5'><h1>News</h1></Link>
                        <Link to="/termine" className='dropdown-item py-3 px-5'><h1>Termine</h1></Link>
                        <Link to="/about" className='dropdown-item py-3 px-5'><h1>Team</h1></Link>  
                        <Link to="/kontakt" className='dropdown-item py-3 px-5'><h1>Kontakt</h1></Link>
                    </ul>
                </div>

            </div>
        </header>
  )
}

export default Header