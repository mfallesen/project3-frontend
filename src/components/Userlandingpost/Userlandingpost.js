import { Card, CardHeader, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    cardRow: {
        margin: 0,
    }
});

export default function Userlandingpost() {
    const classes = useStyles();
    
    function UserPostCard() {
        return (
            <Grid item sm={3}>
                <Card>
                    
                    <CardHeader
                    title=" My Adventure"
                    />

                    <CardMedia
                    className={classes.media}
                    image="https://picsum.photos/150/200"
                    />    
                    
                    <Typography>Check out adventure!</Typography>
                </Card>
            </Grid>
        )
    }
    
    
    return (
        <div>
            <Grid container>
                <Grid className={classes.cardRow} container item md={12} spacing={3}>
                    <UserPostCard/>
                    <UserPostCard/>
                    <UserPostCard/>
                    <UserPostCard/>
                </Grid>
                <Grid className={classes.cardRow} container item md={12} spacing={3}>
                    <UserPostCard/>
                    <UserPostCard/>
                    <UserPostCard/>
                    <UserPostCard/>
                </Grid>

            </Grid>
        </div>
    )
}
