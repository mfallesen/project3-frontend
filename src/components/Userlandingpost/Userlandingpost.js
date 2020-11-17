import {Grid,} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import UserPostCard from '../UserPostCard'

const useStyles = makeStyles({
    cardRow: {
        margin: 0,
    }
});

export default function Userlandingpost() {
    const classes = useStyles();  
    
    return (
        <div>
            <Grid container>
                <Grid className={classes.cardRow} container item md={12} spacing={3}>
                    <UserPostCard/>
                    <UserPostCard/>
                    <UserPostCard/>
                    <UserPostCard/>
                {/* </Grid>
                <Grid className={classes.cardRow} container item md={12} spacing={3}> */}
                    <UserPostCard/>
                    <UserPostCard/>
                    <UserPostCard/>
                    <UserPostCard/>
                </Grid>

            </Grid>
        </div>
    )
}
