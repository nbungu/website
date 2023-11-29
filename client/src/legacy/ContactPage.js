// client/src/ContactPage.js

import React from 'react';

function ContactPage() {
  
  return (
      <div className="tiles-container-2col">
        <div className="fixed-tile">
            <div className="hstack gap-3">
                <div className="p-2">First item</div>
                <div className="p-2">Second item</div>
                <div className="p-2">Third item</div>
            </div>
            <div className="hstack gap-3">
                <div className="p-2">First item</div>
                <div className="p-2">Second item</div>
                <div className="vr"></div>
                <div className="p-2">Second item</div>
            </div>
            
            
        </div>
        <div className="fixed-tile">
            <p className="text-center text-body-secondary">social 1</p>
            <p className="text-center text-body-secondary">social 2</p>
            <p className="text-center text-body-secondary">social 3</p>
        </div>
        <div className="fixed-tile" style={{gridColumn: 'span 2'}}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2630.0969993759145!2d9.590841277508565!3d48.76094390755783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799a4d635e283d3%3A0x2eaf24183c07214d!2sEishalle%20Adelberg!5e0!3m2!1sde!2sde!4v1695582753695!5m2!1sde!2sde" width="100%" height="480px, 100" style={{border: '0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
  )
}

export default ContactPage