import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, Typography, Button, Grid } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { CloudinaryContext, Image } from "cloudinary-react";
import ReactCardFlip from 'react-card-flip';

// *******UNCOMMENT BELOW FOR BUTTON FUNCTIONALITY******************
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function CompanyAdventureCard(props) {
  console.log('company card props: ', props);
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
              { props.text.length > 100 ?
                `${props.text.substring(0, 100)} ...` :
                props.text
              }
            </Typography>
          </CardContent>
          <Button color={'secondary'} fullWidth={true} onClick={() => props.deleteCard(props.adventure)}><DeleteForeverIcon /></Button>
        </Card>

        <Card onClick={handleClick}>
          <CardContent>
              <Typography>{props.text}</Typography>
          </CardContent>
        </Card>

      </ReactCardFlip>
    </Grid>
  );
}