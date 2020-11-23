import React, { useState } from 'react';
import API from "../../utils/API";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  h1Text: {
    color: "black"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const goToLogin = () => {
  window.location.href = "/signin"
}

export default function UserSignUp(props) {
  const classes = useStyles();
  console.log(props);

  const preventDefault = (event) => event.preventDefault();

  return (
    <Container component="main" maxWidth="xs">

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.h1Text}>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={props.handleUserRegFormSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="first_name"
                label="First Name"
                name="first_name"
                autoComplete="first name"
                onChange={props.inputChange}
                value={props.form.first_name}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="Last Name"
                onChange={props.inputChange}
                value={props.form.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={props.inputChange}
                value={props.form.email}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                onChange={props.inputChange}
                value={props.form.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={props.inputChange}
                value={props.form.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            value="register"
          >
            Sign Up
                    </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={() => goToLogin()} variant="body2">
                Already have an account? Sign in!
                  </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>

  );
};
