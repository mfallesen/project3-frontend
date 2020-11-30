import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '../Typography';
import { Grid } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body1" color="textSecondary" align="center">
      {'Copyright © '}
      <Link underline='always' color="inherit" href="/home" variant='body1'>
        Minnesvärt
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  spacer: {
    paddingTop: theme.spacing(2)
  }
}));

function CompanySignIn() {
  return (
    <Typography
      variant='subtitle2' color='textSecondary' align='center'
    >
      {`Have Adventures to share? `}<Link underline='always' color='inherit' href='/companylogin' variant='subtitle2'>Login</Link>
      {` or `} <Link underline='always' color='inherit' href='/companysignup' variant='subtitle2'>Sign Up</Link>
      {` as an Adventure provider! Our Community would love to hear about them!`}
    </Typography>
  )
}

export default function Footer() {
  const classes = useStyles();

  return (

    < Grid container className={classes.footer} alignItems='center' direction="column" justify='center'>

      <Grid item alignItems='center'>
        <Typography variant="h6" gutterBottom>
          Local Memories. Locally Minnesvärt.
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Minnesvärt (Min-es-vah-rt) is the Swedish word for memorable and there's lots of ways to create great memories in your local area. The trouble has always been in finding them. Minnesvärt isn't just another social network but a place for people to share where they've been able to make memories in a way that doesn’t require spending a fortune to travel. It's a great place to find hiking trails, picnic spots, local festivals, and other microadventures. Memories last for a lifetime, but that doesn't mean you should spend one paying for them.
        </Typography>
      </Grid>

      <Grid className={classes.spacer} item >
        <CompanySignIn />
        <Grid className={classes.spacer}>
          <Copyright />
        </Grid>

      </Grid>
    </Grid >

  );
}