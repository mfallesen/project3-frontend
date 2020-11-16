import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Card, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

// import ReactCardFlip from 'react-card-flip';
// import { useState } from 'react'

const useStyles = makeStyles( {
    root: {
        flexGrow: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    card: {
        textAlign: 'center'
    },
    cardRow: {
        margin: 0,
    },
});
// const const [state, setstate] = useState(initialState)

export default function Adventure() {
    const classes = useStyles();

    function AdventureCard() {
        return (
                <Grid item sm={6}  >
                        

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

    return (
        <div className={classes.root} >

        <Grid container spacing={1} alignItems={'center'}>
            <Grid className={classes.cardRow} container item md={12} spacing={3}>
                <AdventureCard></AdventureCard>
                <AdventureCard></AdventureCard>
            </Grid>
            <Grid className={classes.cardRow} container item md={12} spacing={3}>
                <AdventureCard></AdventureCard>
                <AdventureCard></AdventureCard>
            </Grid>

        </Grid>
        </div>
    )
}
