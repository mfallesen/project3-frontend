import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { Button, Card, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ReactCardFlip from 'react-card-flip';


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

    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    }

    return (

        <Grid item xs={props.xs} sm={props.sm} md={props.md} className={classes.cardBack}>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">

            <Card className={classes.card} onClick={handleClick}>
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

            <Card onClick={handleClick} >
                <CardContent>
                    <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Typography>
                </CardContent>
                <Button>More Info</Button>
                {/* Add to favorites button */}
            </Card>


            </ReactCardFlip>
        </Grid>

    )
}
