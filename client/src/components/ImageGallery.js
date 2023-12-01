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

    return (

        <div className="container-flex">
            <div className="row justify-content-center">
                {imagePaths.map((imagePath, index) => (
                <div key={index} className="col-6 col-sm-4 p-2">
                    <div className="gallery-item" onClick={() => openImageModal(imagePath)} style={{ cursor: 'pointer' }}>
                        <img src={imagePath} alt={`Image ${index + 1}`} className='rounded' />
                    </div>
                </div>
                ))}
            </div>

            {selectedImage && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <img src={selectedImage} alt="Full Size Image" className="img-fluid" />
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeImageModal}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ImageGallery
