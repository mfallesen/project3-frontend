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

export default function SignUp() {
    const classes = useStyles();

    const currentCompanyUserId = localStorage.getItem("COMPANYUSERID");

    const [businessInfoFormState, setBusinessInfoFormState] = useState({
        name: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        zip_code: "",
        phone: "",
        email: "",
        website: "",
        description: "",
        image: "",
        CompanyUserId: currentCompanyUserId,
    })

    const [image, setImage] = useState([])

    const inputChange = event => {
        const { name, value } = event.target;
        setBusinessInfoFormState({
            ...businessInfoFormState,
            [name]: value
        })
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        API.addCompany(businessInfoFormState).then(userData => {
            console.log("AFTER API: ", userData);
        }).then(() => {
            window.location.href = "/companylogin";
        })
        setBusinessInfoFormState({
            name: "",
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            zip_code: "",
            phone: "",
            email: "",
            website: "",
            description: "",
            image: "",
            CompanyUserId: "",
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
                    setBusinessInfoFormState({
                        ...businessInfoFormState,
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
        <Container component="main" maxWidth="xs">

            <div className={classes.paper}>
                <Typography component="h1" variant="h5" className={classes.h1Text}>
                    Tell use more about your adventure business!
                </Typography>
                <form className={classes.form} onSubmit={handleFormSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Business Name"
                                name="name"
                                autoComplete="name"
                                onChange={inputChange}
                                value={businessInfoFormState.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="address_1"
                                label="Address 1"
                                name="address_1"
                                autoComplete="address_1"
                                onChange={inputChange}
                                value={businessInfoFormState.address_1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="address_2"
                                label="Address 2"
                                name="address_2"
                                autoComplete="address_2"
                                onChange={inputChange}
                                value={businessInfoFormState.address_2}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="city"
                                label="City"
                                name="city"
                                autoComplete="city"
                                onChange={inputChange}
                                value={businessInfoFormState.city}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="state"
                                label="State"
                                name="state"
                                autoComplete="state"
                                onChange={inputChange}
                                value={businessInfoFormState.state}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="zip_code"
                                label="Zip Code"
                                name="zip_code"
                                autoComplete="zip_code"
                                onChange={inputChange}
                                value={businessInfoFormState.zip_code}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                label="Phone"
                                name="phone"
                                autoComplete="phone"
                                onChange={inputChange}
                                value={businessInfoFormState.phone}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                onChange={inputChange}
                                value={businessInfoFormState.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="website"
                                label="Website"
                                name="website"
                                autoComplete="website"
                                onChange={inputChange}
                                value={businessInfoFormState.website}
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
                                value={businessInfoFormState.description}
                                multiline="true"
                                rows="6"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}>

                                {businessInfoFormState.image ? <Image
                                    publicId={businessInfoFormState.image}
                                    fetch-format="auto"
                                    quality="auto"
                                /> : ""}
                            </CloudinaryContext>
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
                                autoComplete="image"
                                onChange={inputChange}
                                value={businessInfoFormState.image}
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
                        Add New Information
                    </Button>
                </form>
            </div>
        </Container>
    );
}