import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Card, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles({    
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    card: {
        textAlign: 'center'
    },
})

export default function AdventureCard(props) {
    const classes = useStyles();
    return (

        <Grid item xs={props.xs} sm={props.sm} md={props.md}>
            <Card className={classes.card}>
                <CardHeader
                    title={props.title}
                />
                <CardMedia
                    className={classes.media}
                    image={props.image}
                ></CardMedia>
                <CardContent>
                    <Typography>{props.text}</Typography>
                </CardContent>
            </Card>
        </Grid>

    )
}
