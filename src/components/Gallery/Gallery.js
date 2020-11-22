import { makeStyles } from '@material-ui/styles'
import React from 'react'
import './Gallery.css'
import {
    Gallery
} from "react-activity-feed";
import { Grid, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    gallery: {
        backgroundColor: theme.palette.background.paper,
        padding: 12,
        border: "none"
    }
}));

const galleryImages = [
    'https://res.cloudinary.com/crowandrew/image/upload/c_scale,w_800/v1605937401/minnesvart/wojciech-then-DijA5f0voGQ-unsplash_yy3yf1.jpg',
    'https://res.cloudinary.com/crowandrew/image/upload/c_scale,w_800/v1605937400/minnesvart/linus-sandvide-bhSNKT5aaMc-unsplash_bhghon.jpg',
    'https://res.cloudinary.com/crowandrew/image/upload/c_scale,w_800/v1605937400/minnesvart/ricardo-frantz-sC-BXbi9ajw-unsplash_bcpwf9.jpg',
    'https://res.cloudinary.com/crowandrew/image/upload/c_scale,w_800/v1605937399/minnesvart/sandra-seitamaa-LVvFCmmwWlk-unsplash_mlhc53.jpg',
    'https://res.cloudinary.com/crowandrew/image/upload/c_scale,w_800/v1605937399/minnesvart/manuel-meurisse-QHeAAc3y76Y-unsplash_fgpp40.jpg',
    'https://res.cloudinary.com/crowandrew/image/upload/c_scale,w_800/v1605937399/minnesvart/processingly-JHpF0vUrp-E-unsplash_oyxj6r.jpg',
    'https://res.cloudinary.com/crowandrew/image/upload/c_scale,w_800/v1605937398/minnesvart/didin-emelu-8--kuxbxuKU-unsplash_izhmve.jpg',
    'https://res.cloudinary.com/crowandrew/image/upload/c_scale,w_800/v1605937397/minnesvart/lance-anderson--nte12rkTok-unsplash_pk5bay.jpg',
    'https://res.cloudinary.com/crowandrew/image/upload/c_scale,w_800/v1605937397/minnesvart/matthew-sleeper-Spdu7YT1O00-unsplash_dxwbj9.jpg',
    'https://res.cloudinary.com/crowandrew/image/upload/c_scale,w_800/v1605937396/minnesvart/kimo-AUX_FYWjUXY-unsplash_nhjne9.jpg',
    'https://res.cloudinary.com/crowandrew/image/upload/c_scale,w_800/v1605937395/minnesvart/manuel-meurisse-sVITXInq_9k-unsplash_i9yerf.jpg',
    'https://res.cloudinary.com/crowandrew/image/upload/c_scale,w_800/v1605937393/minnesvart/daniel-jensen-tQpypKA92k8-unsplash_nsze6z.jpg',
    'https://res.cloudinary.com/crowandrew/image/upload/c_scale,w_800/v1605937317/minnesvart/benjamin-davies-mqN-EV9rNlY-unsplash_pdjixw.jpg'
]


export default function HeroGallery() {
    const classes = useStyles();

    return (

        <Grid container className={classes.gallery}>
            <Grid item xs={12}>

                <Gallery
                    images={galleryImages}
                />
            </Grid>
        </Grid>

    )
}
