import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, Typography, Button, Grid } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { CloudinaryContext, Image } from "cloudinary-react";
import ReactCardFlip from 'react-card-flip';
import GoogleMaps from '../GoogleMaps';

const useStyles = makeStyles((theme) => ({

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
}));

export default function CompanyAdventureCard(props) {
  const classes = useStyles();

  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  }

  return (
    <Grid item xs={6} sm={6} md={3}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">

        <Card onClick={handleClick}>
          <CardHeader

            title={props.title}
            subheader={props.date}
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
            <Typography variant="body2" color="textSecondary" component="p">
              {props.text.length > 100 ?
                `${props.text.substring(0, 100)} ...` :
                props.text
              }
            </Typography>
          </CardContent>
          <Grid container >
            <Grid item xs={6}>
              <Button color={'secondary'} onClick={() => props.deleteCard(props.adventure)}><DeleteForeverIcon /></Button>
            </Grid>
            <Grid item xs={6}>
              <Button color={'primary'} onClick={() => handleClick}>More Info</Button>
            </Grid>
          </Grid>
        </Card>

        <Card elevation='6' >
          <CardContent >
            <Typography>{props.text}</Typography>
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
        </Card>

      </ReactCardFlip>
    </Grid>
  );
}