import React from "react";
import './Overlay.css'
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid"



const useStyles = makeStyles({
    root: {
        paddingTop: "200px",
    },

});

export default function Overlay(props) {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Typography>
                    <h1>Memorable Microadventures</h1>
                </Typography>
                <Button className={props.btn}>Sign Up</Button>
            </Grid>
        </Grid>
    );
}

