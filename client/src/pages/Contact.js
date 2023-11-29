// client/src/pages/Contact.js

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Contact() {
  
  return (
    <div className='body-bg d-flex flex-column'>

        <Header currentPage={"contact"}/>

        <div className='flex-grow-1'>
            <div className="tiles-container col2">
                
                <div className="fixed-tile">
                    <h2>Verein</h2>
                    <div className="vstack gap-2 p-3">
                        <div className="text-start">1. Athletiksportverein Schlichten e.V.</div>
                        <div className="text-start">Grabäckerstr. 5</div>
                        <div className="text-start">73614 Schorndorf-Schlichten</div>
                        <div className="border-bottom"/>
                        <div className="text-start">https://asv-schlichten.de/</div>
                        <div className="text-start">info@asv-schlichten.de</div>
                    </div>
                </div>
                <div className="fixed-tile">
                    <h2>Kontaktpersonen</h2>
                    <div className="vstack gap-2 p-3">
                        <div>Klaus Moser</div>
                        <div>Betreuer</div>
                        <div>klaus.moser@asv-schlichten.de</div>
                        <div className="border-bottom"/>
                    </div>
                </div>
                <div className="fixed-tile" style={{gridColumn: 'span 2'}}>
                    <iframe title='gmaps' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2630.0969993759145!2d9.590841277508565!3d48.76094390755783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799a4d635e283d3%3A0x2eaf24183c07214d!2sEishalle%20Adelberg!5e0!3m2!1sde!2sde!4v1695582753695!5m2!1sde!2sde" width="100%" height="480px, 100" style={{border: '0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>

        <Footer/>
        
    </div>      
  )
}

export default Contact