import React, { useState, useEffect } from 'react';
import { CloudinaryContext, Image } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "./CloudinaryService";
import './Cloudinary.css';

function Cloudinary() {
    const [images, setImages] = useState([])

    const beginUpload = tag => {
        const uploadOptions = {
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
            tags: [tag, 'anImage'],
            uploadPreset: process.env.REACT_APP_CLOUDINARY_PRESET,
        };
        openUploadWidget(uploadOptions, (error, photos) => {
            if (!error) {
                console.log(photos);
                if (photos.event === 'success') {
                    setImages([...images, photos.info.public_id])
                }
            } else {
                console.log(error);
            }
        })
    }

    useEffect(() => {
        fetchPhotos("image", setImages);
    }, [])

    return (
        <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}>
            <div className="App">
                <button onClick={() => beginUpload("image")}>Upload Image</button>
                <section>
                    {images.map(i => <Image
                        key={i}
                        publicId={i}
                        fetch-format="auto"
                        quality="auto"
                    />)}
                </section>
            </div>
        </CloudinaryContext>
    );
}

export default Cloudinary;