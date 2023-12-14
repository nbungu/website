// client/src/components/ImageGallery.js

import React, { useState } from 'react';;

function ImageGallery({ imagePaths }) {  
 
    const [selectedImage, setSelectedImage] = useState(null);

    const openImageModal = (imagePath) => {
    setSelectedImage(imagePath);
    };

    const closeImageModal = () => {
    setSelectedImage(null);
    };

    const downloadImage = (imagePath) => {
        const link = document.createElement('a');
        link.href = imagePath;
        link.download = 'downloaded_image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

    return (

        <div className="container-flex">
            <div className="row g-3">
                {imagePaths.map((imagePath, index) => (
                <div key={index} className="col-6 col-md-3">
                    <div className="gallery-item rounded" onClick={() => openImageModal(imagePath)} style={{ cursor: 'pointer' }}>
                        <img src={imagePath} alt={`Image ${index + 1}`} className='rounded' />
                    </div>
                </div>
                ))}
            </div>

            {selectedImage && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">

                            <div className="row align-items-center justify-content-between p-3">

                                <div className="col-auto">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeImageModal}/>
                                </div>

                                <div className="col-auto">
                                    <button type="button" class='btn btn-success' onClick={() => downloadImage(selectedImage)}><i className="bi bi-arrows-fullscreen"/></button>
                                </div>

                            </div>

                            
                            <div className="modal-body pt-0">
                                <img src={selectedImage} alt="Full Size Image" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageGallery
