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
  }
}));


function CompanySignIn() {
  return (
    <Typography
    variant='body1' color='textSecondary' align='right'
    >
      {`Have Adventures to share? `}<Link underline='always' color='inherit' href='/companylogin' variant='body1'>Login</Link>
      {` or `} <Link underline='always' color='inherit' href='/companysignup' variant='body1'>Sign Up</Link>
      {`! We'd Love to hear about them!`}
    </Typography>
  )
}


export default function Footer() {
  const classes = useStyles();

  return (

    < footer className={classes.footer} >
      <Typography variant="h6" align="center" gutterBottom>
        Local Memories. Local Minnesvärt.
        </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        copy goes here
        </Typography>
        <Grid container justify='space-between'>
      <CompanySignIn xs={6}/>
      <Copyright xs={6}/>
        </Grid>
    </footer >

  );
}