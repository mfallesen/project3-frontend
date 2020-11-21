import React from "react";
import './Overlay.css'
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid"
import {Link} from 'react-router-dom';
// import UserSignUp from "../UserSignUp/UserSignUp";



const useStyles = makeStyles({
    root: {
        paddingTop: "200px",
    },

});

export default function Overlay(props) {
    const classes = useStyles();

    const signup = (props) =>{
        window.location.href = "/registeruser";
    }
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Typography>
                    <h1>Memorable Microadventures</h1>
                </Typography>
                <Link to={"/registeruser"} ><Button className={props.btn} onclick={signup}>Sign Up</Button></Link>
            </Grid>
        </Grid>
    );
}

