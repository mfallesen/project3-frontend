import React, { useState, useEffect } from 'react';
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

export default function SignUp() {
    const classes = useStyles();

    const [loginFormState, setLoginFormState] = useState({
        username: "",
        password: ""
    })

    const [companyProfileState, setCompanyProfileState] = useState({
        username: "",
        email: "",
        token: "",
        id: "",
        isCompanyLoggedIn: false
    })

    useEffect(getCompanyData, [])

    function getCompanyData() {
        const token = localStorage.getItem("JWTCOMPANY");
        const username = localStorage.getItem("USERNAMECOMPANY");
        if (token && username) {
            API.getCompanyProfile(username, token).then(companyProfileData => {
                if (companyProfileData) {
                    setCompanyProfileState({
                        username: companyProfileData.data.username,
                        email: companyProfileData.data.email,
                        id: companyProfileData.data.id,
                        isCompanyLoggedIn: true
                    })
                } else {
                    localStorage.removeItem("JWTCOMPANY");
                    setCompanyProfileState({
                        username: "",
                        email: "",
                        token: "",
                        id: "",
                        isCompanyLoggedIn: false
                    })
                }
            })
        }
    }

    // })
    const inputChange = event => {
        const { name, value } = event.target;
        setLoginFormState({
            ...loginFormState,
            [name]: value
        })
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        API.loginCompany(loginFormState).then(newToken => {
            console.log("NewToken in CompanyLogin: ", newToken);
            localStorage.setItem('JWTCOMPANY', newToken.data.token);
            localStorage.setItem('USERNAMECOMPANY', loginFormState.username);
        }).then(() => {
            window.location.href = `/companydashboard/${loginFormState.username}`;//if we do this, then it erases all local state
        })
        setLoginFormState({
            username: "",
            password: ""
        })
    }

    return (
        <Container component="main" maxWidth="xs">

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.h1Text}>
                    Business Login
                </Typography>
                <form className={classes.form} onSubmit={handleFormSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="User Name"
                                name="username"
                                autoComplete="username"
                                onChange={inputChange}
                                value={loginFormState.username}
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
                                onChange={inputChange}
                                value={loginFormState.password}
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
                        Login
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}