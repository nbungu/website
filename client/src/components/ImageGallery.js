// client/src/components/ImageGallery.js

import React, { useState } from 'react';

function ImageGallery({ imagePaths }) {  
 
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const maxIndexNr = imagePaths.length - 1;

    const openImageModal = (imagePath, index) => {
        setSelectedImage(imagePath);
        setSelectedIndex(index);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    const prevImage = () => {
        const index = selectedIndex === 0 ? maxIndexNr : selectedIndex - 1;
        setSelectedImage(imagePaths[index]);
        setSelectedIndex(index);
    };
    const nextImage = () => {
        const index = selectedIndex === maxIndexNr ? 0 : selectedIndex + 1;
        setSelectedImage(imagePaths[index]);
        setSelectedIndex(index);
    };

    return (
        <div className="container-flex">
            {/* IMAGE GALLERY */}
            <div className="row g-3">
                {imagePaths.map((imagePath, index) => (
                <div key={index} className="col-6 col-md-3">
                    <div className="gallery-item rounded" onClick={() => openImageModal(imagePath, index)} style={{ cursor: 'pointer' }}>
                        <img src={imagePath} alt={`Gallery Item ${index + 1}`} className='rounded' title={`Gallerie Bild ${index + 1}`}/>
                    </div>
                </div>
                ))}
            </div>

            {/* IMAGE POPOVER */}
            {selectedImage && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered modal-xl p-3">
                        {/* POPOVER CONTENT */}
                        <div className="modal-content">

                            <div className="row align-items-center justify-content-between m-3 g-0">

                                <div className="col-auto">
                                    <button type="button" className="btn-close px-2" data-bs-dismiss="modal" aria-label="Close" title="Schließen" onClick={closeImageModal}></button>
                                </div>
                                
                                <div className="col-auto">
                                    <div className='hstack gap-3'>
                                        <a className='btn btn-success' href={selectedImage} title="Fullscreen anzeigen"><i className="bi bi-arrows-fullscreen"/></a>
                                    </div>
                                    
                                </div>

                            </div>
                            
                            <div className="modal-body py-0">
                                <div className='container-flex'>
                                    <img src={selectedImage} className="img-fluid" style={{ maxHeight: '75vh' }} alt="Full Size"/>
                                </div>
                            </div>

                            <div className='row align-items-center justify-content-center m-3'>
                                    <div className='col-auto'>
                                        <button type="button" class='btn btn-outline-dark mx-3' onClick={() => prevImage()}><i className="bi bi-chevron-left"/></button>
                                        <button type="button" class='btn btn-outline-dark mx-3' onClick={() => nextImage()}><i className="bi bi-chevron-right"/></button>
                                    </div>                                    
                                </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageGallery

/*

<a target='_blank' download={selectedImage} className='btn btn-outline-primary' title="Jetzt herunterladen"><i className="bi bi-download"/></a>
                                        <button type="button" className='btn btn-outline-dark' title="Teilen"><i className="bi bi-share-fill"/></button>

*/
