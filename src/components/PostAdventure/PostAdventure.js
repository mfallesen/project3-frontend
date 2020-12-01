import React, { useState, useEffect } from 'react';
import API from "../../utils/API";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CloudinaryContext, Image } from "cloudinary-react";
import { openUploadWidget } from "../Cloudinary/CloudinaryService";
import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';
import AdventureCard from '../AdventureCard'

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

export default function AdventurePost(props) {
    const classes = useStyles();

    // const adventureCompanyId = localStorage.getItem("ADVENTURECOMPANYID");
    const [adventureInfoFormState, setAdventureInfoFormState] = useState({
        name: "",
        description: "",
        longitude: "",
        latitude: "",
        image: "",
        AdventureCompanyId: props.companyProfile.Adventure_company.id,
    });

    const [image, setImage] = useState([])

    const inputChange = event => {
        const { name, value } = event.target;
        setAdventureInfoFormState({
            ...adventureInfoFormState,
            [name]: value
        })
    }

    const extract = (str) => {
        var rgx = /#(\w+)\b/gi;
        var result = [];
        var temp;
        while (temp = rgx.exec(str)) {
            result.push(temp[1])
        }
        return result;
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        const token = localStorage.getItem('JWTCOMPANY');
        let tags = extract(adventureInfoFormState.description)
        API.addAdventure(adventureInfoFormState, tags, props.companyProfile.Adventure_company.id, token).then(userData => {
            console.log("AFTER API: ", userData);
        })
        setAdventureInfoFormState({
            name: "",
            description: "",
            longitude: "",
            latitude: "",
            image: "",
            AdventureCompanyId: props.companyProfile.Adventure_company.id,
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
                    setAdventureInfoFormState({
                        ...adventureInfoFormState,
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
                <Grid item xs={12} sm={6}>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5" className={classes.h1Text}>
                            Tell use about your amazing adventure!
                </Typography>
                        <form className={classes.form} onSubmit={handleFormSubmit} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Adventure Name"
                                        name="name"
                                        autoComplete="name"
                                        onChange={inputChange}
                                        value={adventureInfoFormState.name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="description"
                                        label="Description"
                                        placeholder="Describe your adventure and then add hashtags # to make this adventure searchable"
                                        name="description"
                                        autoComplete="description"
                                        onChange={inputChange}
                                        value={adventureInfoFormState.description}
                                        multiline="true"
                                        rows="6"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="longitude"
                                        label="Longitude"
                                        name="longitude"
                                        autoComplete="longitude"
                                        onChange={inputChange}
                                        value={adventureInfoFormState.longitude}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="latitude"
                                        label="Latitude"
                                        name="latitude"
                                        autoComplete="latitude"
                                        onChange={inputChange}
                                        value={adventureInfoFormState.latitude}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button onClick={() => beginUpload("image")}
                                        fullWidth
                                        variant="contained"
                                        color="secondary">Upload Logo</Button>
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
                                        value={adventureInfoFormState.image}
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
                                Add New Adventure
                    </Button>
                        </form>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.paper}>
                        <div className={classes.form}>
                            <AdventureCard
                                title={adventureInfoFormState.name}
                                description={adventureInfoFormState.description}
                                image={adventureInfoFormState.image}
                                lat={adventureInfoFormState.latitude}
                                lon={adventureInfoFormState.longitude}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>

        </Container>


    );
}