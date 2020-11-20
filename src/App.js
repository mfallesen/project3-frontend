import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';

import Footer from './components/Footer';

import Navbar from './components/Navbar';

import theme from './theme'
import API from './utils/API';
import UserLogin from './components/UserLogin/UserLogin';
import { Redirect } from 'react-router-dom';
import UserSignUp from './components/UserSignUp/UserSignUp';



function App() {
  const [loginFormState, setLoginFormState] = useState({
    username: "",
    password: ""
  })

  const [profileState, setProfileState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    city: "",
    state: "",
    image: "",
    token: "",
    id: "",
    isLoggedIn: false
  })

  useEffect(getUserData, [])

  function getUserData() {
    const token = localStorage.getItem("JWT");
    const username1 = localStorage.getItem("USERNAME");
    if (token && username1) {
      API.getProfile(username1, token).then(profileData => {
        console.log("profileData from getUserData :", profileData);
        if (profileData) {
          setProfileState({
            first_name: profileData.data.first_name,
            last_name: profileData.data.last_name,
            email: profileData.data.email,
            city: profileData.data.city,
            state: profileData.data.state,
            image: profileData.data.image,
            id: profileData.data.id,
            isLoggedIn: true
          })
        } else {
          localStorage.removeItem("JWT");
          setProfileState({
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            city: "",
            state: "",
            image: "",
            token: "",
            id: "",
            isLoggedIn: false
          })
        }
      })
    }
  }
  
    const submitForm = event => {
      event.preventDefault();
      API.login(loginFormState).then(newToken => {
        console.log("NewToken :", newToken);
        localStorage.setItem('JWT', newToken.data.token);
        localStorage.setItem('STREAM', newToken.data.appToken);
        localStorage.setItem('USERNAME', loginFormState.username);
        API.getProfile(loginFormState.username, newToken.data.token).then(profileData => {
          setProfileState({
            first_name: profileData.data.first_name,
            last_name: profileData.data.last_name,
            email: profileData.data.email,
            city: profileData.data.city,
            state: profileData.data.state,
            image: profileData.data.image,
            id: profileData.data.id,
            isLoggedIn: true
          })
        }).catch(err => {
          console.log(err);
        })
      })
    }

    const inputChange = event => {
      const { name, value } = event.target;
      setLoginFormState({
        ...loginFormState,
        [name]: value
      })
    }

    // const handleFormSubmit = event => {
    //   event.preventDefault();
    //   API.login(loginFormState).then(loginData => {
    //     console.log("You logged in");

    //   }).then(function () {
    //     // setLoggedInState(true)
    //   }).catch((err) => console.log(err));
    // };

    return (

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar profile={profileState} setProfile={setProfileState}></Navbar >
        {profileState.isLoggedIn ? `Welcome ${profileState.first_name}!` : <UserLogin handleFormSubmit={submitForm} inputChange={inputChange} form={loginFormState} />}
        <Footer />
      </ThemeProvider>

    );
  }

  export default App;
