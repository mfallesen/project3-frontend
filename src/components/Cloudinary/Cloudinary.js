import React, { useState, useEffect } from 'react';
import { CloudinaryContext, Image } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "./CloudinaryService";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

function Cloudinary(props) {
    const [image, setImage] = useState([])

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
                <Button onClick={() => beginUpload("image")}>Upload Image</Button>
                <div>
                    {images.map(i => <Image
                        key={i}
                        publicId={i}
                        fetch-format="auto"
                        quality="auto"
                    />)}
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="image"
                        label="Image"
                        name="image"
                        autoComplete="image"
                        onChange={props.inputChange}
                        value={props.image}
                    />
                </div>
            </div>
        </CloudinaryContext>
    );
}

export default Cloudinary;