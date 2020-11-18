import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { Button, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function CompanyAdventureCard(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  



  return (
    <Grid item xs={6} sm={6} md={3}>

      <Card >
        <CardHeader
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
        <CardMedia
          className={classes.media}
          image={props.image}
          title="Adventure Picture"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.text}
        </Typography>
        </CardContent>
        <Button  color={'secondary'} fullWidth={true}><DeleteForeverIcon /></Button>
      </Card>
    </Grid>
  );
}