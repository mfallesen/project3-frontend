import React from 'react'
import { Card, CardHeader, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});

export default function UserPostCard() {
    const classes = useStyles();

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
