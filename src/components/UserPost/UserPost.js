import React, { useState, useEffect } from 'react';
import API from "../../utils/API";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { openUploadWidget } from "../Cloudinary/CloudinaryService";
import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    h1Text: {
        color: "black"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function UserPost() {
    const classes = useStyles();

    const username = localStorage.getItem("USERNAME");
    const [postInfoFormState, setPostInfoFormState] = useState({
        title: "",
        description: "",
        image: "",
    });

    const [image, setImage] = useState([])

    const inputChange = event => {
        const { name, value } = event.target;
        setPostInfoFormState({
            ...postInfoFormState,
            [name]: value
        })
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        const token = localStorage.getItem('JWT');
        API.addUserPost(postInfoFormState, username, token).then(postData => {
            console.log("AFTER API: ", postData);
        })
        setPostInfoFormState({
            title: "",
            description: "",
            image: "",
        })
    }

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
                    setPostInfoFormState({
                        ...postInfoFormState,
                        image: photos.info.public_id
                    })
                }
            } else {
                console.log(error);
            }
        })
    }

    const url = (publicId, options) => {
        const scOptions = Util.withSnakeCaseKeys(options);
        const cl = CoreCloudinary.new();
        return cl.url(publicId, scOptions);
    };

    async function fetchPhotos(imageTag, setter) {
        const options = {
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
            format: 'json',
            type: 'list',
            version: Math.ceil(new Date().getTime() / 1000),
        };

        const urlPath = url(imageTag.toString(), options);

        fetch(urlPath)
            .then(res => res.text())
            .then(text => (text ? setter(JSON.parse(text).resources.map(image => image.public_id)) : []))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchPhotos("image", setImage);
    }, [])


    return (
        <Container component="main" maxWidth="md">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5" className={classes.h1Text}>
                            Tell everyone about your amazing adventure!
                </Typography>
                        <form className={classes.form} onSubmit={handleFormSubmit} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="title"
                                        label="Post Title"
                                        name="title"
                                        autoComplete="title"
                                        onChange={inputChange}
                                        value={postInfoFormState.title}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="description"
                                        label="Description"
                                        name="description"
                                        autoComplete="description"
                                        onChange={inputChange}
                                        value={postInfoFormState.description}
                                        multiline={true}
                                        rows="6"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button onClick={() => beginUpload("image")}
                                        fullWidth
                                        variant="contained"
                                        color="secondary">Upload Photo</Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="image"
                                        label="Image"
                                        name="image"
                                        disabled="true"
                                        autoComplete="image"
                                        onChange={inputChange}
                                        value={postInfoFormState.image}
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                value="register"
                            >
                                Post
                    </Button>
                        </form>
                    </div>
                </Grid>
            </Grid>

        </Container>


    );
}