import React, { useState } from "react";
import '../css/ImageUploadButton.css';

const ImageUploadPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Upload Image</button>

            {/* Popup */}
            {isOpen && (
                <div id='popup'>
                    <div id="popup-content">
                        <h3>Upload Image</h3>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        <br />
                        {image && <img src={image} alt="Uploaded" style={{ width: "200px", marginTop: "10px" }} />}
                        <br />
                        <button onClick={() => setIsOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploadPopup;
