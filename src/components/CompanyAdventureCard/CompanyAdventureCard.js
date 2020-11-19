import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, Typography, Button, Grid } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { CloudinaryContext, Image } from "cloudinary-react";

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
  const classes = useStyles();

  // *******UNCOMMENT BELOW FOR BUTTON FUNCTIONALITY******************
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };






  return (
    <Grid item xs={6} sm={6} md={3}>

      <Card >
        <CardHeader
          // *******UNCOMMENT BELOW FOR BUTTON FUNCTIONALITY******************
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
          //     <Menu
          //         id="simple-menu"
          //         anchorEl={anchorEl}
          //         keepMounted
          //         open={Boolean(anchorEl)}
          //         onClose={handleClose}
          //     >
          //         <MenuItem onClick={handleClose}><EditIcon/>Edit</MenuItem>
          //         <MenuItem onClick={handleClose}><DeleteForeverIcon/>Delete</MenuItem>
          //     </Menu>
          //   </IconButton>
          // }
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
            {props.text}
          </Typography>
        </CardContent>
        <Button color={'secondary'} fullWidth={true}><DeleteForeverIcon /></Button>
      </Card>
    </Grid>
  );
}