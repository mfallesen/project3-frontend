import React from 'react'
import { Card, CardHeader, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});

export default function UserPostCard(props) {
    const classes = useStyles();

    return (
        <Grid item sm={3}>
                <Card>

                    <CardHeader
                    title={props.title}
                    />
                    <CardMedia
                    className={classes.media}
                    image={props.image}
                    />    
                    
                    <Typography>{props.text}</Typography>
                </Card>
            </Grid>
    )
}
