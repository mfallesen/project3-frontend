import React from "react";
import './Overlay.css'
import { makeStyles } from "@material-ui/core/styles";
import {Typography, Button, Grid} from "@material-ui/core/";

const useStyles = makeStyles({
    root: {
        paddingTop: "200px",
    },
    textColor: {
        color: 'white',
        paddingBottom: 10,
    }
});

export default function Overlay(props) {
    const classes = useStyles();

    const signup = (props) =>{
        window.location.href = "/registeruser";
    }
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Typography variant='h5' className={classes.textColor}>
                    Memorable Microadventures
                </Typography>
                <Button href={'/registeruser'} className={props.btn} onclick={signup}>Sign Up</Button>
            </Grid>
        </Grid>
    );
}

