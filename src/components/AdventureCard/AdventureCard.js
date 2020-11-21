import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { Button, Card, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ReactCardFlip from 'react-card-flip';
import { CloudinaryContext, Image } from "cloudinary-react";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import IconButton from '@material-ui/core/IconButton';
import API from "../../utils/API";
import GoogleMaps from '../GoogleMaps';

const useStyles = makeStyles({
    card: {
        textAlign: 'center'
    },
})



export default function AdventureCard(props) {
    console.log(props.id)
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
            const data = response.data


        }).then(() => {
            postLikeCount(props.id);
        })
    }


    return (

        <Grid item xs={props.xs} sm={props.sm} md={props.md}>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">

                <Card className={classes.card} elevation='6'>
                    <CardHeader
                        title={props.title}
                    />
                    <CardMedia>
                        <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}>


                            {!props.image === undefined ? <Image
                                publicId={props.image}
                                dpr="auto"
                                responsive
                                width="auto"
                                crop="scale"
                                responsiveUseBreakpoints="true"

                                loading="lazy"
                            /> : <Image
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
                    <CardContent>
                        <Typography>
                            {props.description.length > 100 ?
                                `${props.description.substring(0, 100)} ...` :
                                props.text
                            }
                        </Typography>
                        {console.log(props, "Props")}
                        <Grid container justify='space-between'>

                            <Typography align='justify' variant='button'><Button disabled>{likeCount} Likes</Button><IconButton onClick={() => {
                                postRatingDB(props.id)
                            }} color='primary'><ThumbUpAltIcon /></IconButton></Typography>

                            <Button onClick={handleClick} >More Info</Button>


                        </Grid>
                    </CardContent>
                </Card>

                <Card elevation='6'>
                    <CardContent>
                        <Typography>{props.description}</Typography>
                        <hr />
                        <GoogleMaps />
                        <Grid container justify='flex-end'>
                            <Button onClick={handleClick}>Less Info</Button>
                        </Grid>
                    </CardContent>
                    {/* Add to favorites button */}
                </Card>


            </ReactCardFlip>
        </Grid>

    )
}
