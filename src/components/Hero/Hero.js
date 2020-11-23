import { makeStyles } from '@material-ui/styles'
import React from 'react'
import './Hero.css'
import Overlay from '../Overlay';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    btn: {
        background: '#687864',
        color: 'white',
        zIndex: 1,
    }
})

const VideoBackground = () => {

    return (

        <Grid>
            <video src="https://res.cloudinary.com/crowandrew/video/upload/v1605856063/minnesvart/Pexels_Videos_2040075_l0ekbp.mp4" playsInline autoPlay='autoplay' muted >
            </video>
        </Grid>
    )

}


export default function Hero() {
    const classes = useStyles();

    return (

        <section>

            <Overlay btn={classes.btn} />
            <VideoBackground>
            </VideoBackground>
        </section>
    )
}
