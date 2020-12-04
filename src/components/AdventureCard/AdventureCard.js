import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { Button, Card, CardContent, CardHeader, CardMedia, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ReactCardFlip from 'react-card-flip';
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import IconButton from '@material-ui/core/IconButton';
import API from "../../utils/API";
import GoogleMaps from '../GoogleMaps';

const useStyles = makeStyles({
    card: {
        textAlign: 'center',
        height: '500'
    },
})

export default function AdventureCard(props) {
    const classes = useStyles();
    const [isFlipped, setIsFlipped] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    }

    useEffect(() => {
        // postRatingDB(props.id);
        postLikeCount(props.id);
    }, []);

    const postLikeCount = (id) => {
        const token = localStorage.getItem("JWT");
        API.countAdventureRating(token, id).then(response => {
            setLikeCount(response.data);

        })
    }
    const postRatingDB = (id) => {

        const token = localStorage.getItem("JWT");
        API.postAdventureRating(token, id).then(response => {
            postLikeCount(props.id);
        }).catch(err => console.error(err))
    }

    return (

        <Grid item xs={props.xs} sm={props.sm} md={props.md} lg={props.lg}>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">

                <Card className={classes.card} elevation='6'>
                    <Grid container>
                        <Grid item xs={12}>
                            <CardHeader
                                title={props.title}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CardMedia>

                                <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} >
                                    {props.image ?
                                        <Image
                                            publicId={props.image}
                                            dpr="auto"
                                            responsive
                                            width="auto"
                                            crop="scale"
                                            responsiveUseBreakpoints="true"
                                            loading="lazy"
                                            height="400"
                                        >
                                        </Image>
                                        : <Image
                                            publicId="minnesvart/solo_travel_germany_gytbwl.jpg"
                                            dpr="auto"
                                            responsive
                                            width="auto"
                                            crop="scale"
                                            responsiveUseBreakpoints="true"
                                            loading="lazy"
                                        />}
                                </CloudinaryContext>

                            </CardMedia>
                        </Grid>
                        <Grid item xs={12}>
                            <CardContent>
                                <Typography>
                                    {props.description.length > 80 ?
                                        `${props.description.substring(0, 80)} ...` :
                                        props.text
                                    }
                                </Typography>
                                <Grid container justify='space-between'>

                                    <Typography align='justify' variant='button'><Button disabled>{likeCount} Likes</Button><IconButton onClick={() => {
                                        postRatingDB(props.id)
                                    }} color='primary'><ThumbUpAltIcon /></IconButton></Typography>

                                    <Button onClick={handleClick} >More Info</Button>


                                </Grid>

                            </CardContent>
                        </Grid>
                    </Grid>

                </Card>

                <Card elevation='6' >
                    <CardContent >
                        <Typography>{props.description}</Typography>
                        <hr />
                        <GoogleMaps lat={props.lat} lon={props.lon} />
                        <Grid container justify='space-between'>
                            <Grid item >
                                <Button href={`https://${props.website}`}>Check out the company!</Button>
                            </Grid>
                            <Grid item justify='flex-end'>
                                <Button onClick={handleClick}>Less Info</Button>
                            </Grid>
                        </Grid>

                    </CardContent>
                    {/* Add to favorites button */}
                </Card>

            </ReactCardFlip>
        </Grid>

    )
}
