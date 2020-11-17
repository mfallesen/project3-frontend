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

export default function AdventureCard() {
    const classes = useStyles();
    return (

        <Grid item xs={12} sm={6}  >
            <Card className={classes.card}>
                <CardHeader
                    title='Lakeside Dock Sitting Adventures'
                />
                <CardMedia
                    className={classes.media}
                    image='https://res.cloudinary.com/crowandrew/image/upload/v1605219058/minnesvart/solo_travel_germany_gytbwl.png'
                ></CardMedia>
                <CardContent>
                    <Typography>WE TAKE YOU ON COOL ADVENTURES!</Typography>
                </CardContent>
            </Card>
        </Grid>

    )
}
