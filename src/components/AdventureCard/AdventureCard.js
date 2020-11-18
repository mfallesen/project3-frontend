import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { Button, Card, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ReactCardFlip from 'react-card-flip';
import { CloudinaryContext, Image } from "cloudinary-react";


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

        <Grid item xs={props.xs} sm={props.sm} md={props.md}>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">

                <Card className={classes.card} onClick={handleClick}>
                    <CardHeader
                        title={props.title}
                    />
                    <CardMedia>
                        <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}>


                            {props.image ? <Image
                                publicId={props.image}
                                fetch-format="auto"
                                quality="auto"
                                height="500"
                                width="400"
                                crop="fill"
                            /> : <Image
                                    publicId="minnesvart/solo_travel_germany_gytbwl.jpg"
                                    fetch-format="auto"
                                    quality="auto"
                                    height="500"
                                    width="400"
                                    crop="fill"
                                />}
                        </CloudinaryContext>
                    </CardMedia>
                    <CardContent>
                        <Typography>{props.text}</Typography>
                    </CardContent>
                </Card>

                <Card onClick={handleClick} >
                    <CardContent>
                        <Typography>{props.description}</Typography>
                    </CardContent>
                    <Button>More Info</Button>
                    {/* Add to favorites button */}
                </Card>


            </ReactCardFlip>
        </Grid>

    )
}
