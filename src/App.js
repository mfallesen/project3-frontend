import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Navbar from './components/Navbar';
import theme from './theme'
import API from './utils/API';
import UserLogin from './components/UserLogin/UserLogin';
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom';
import UserSignUp from './components/UserSignUp/UserSignUp';
import Hero from "./components/Hero";
import AdventureLanding from './components/AdventureLanding';
import Profile from './components/Profile';
import CompanySignup from './components/CompanySignup';
import CompanyLogin from './components/CompanyLogin';
import CompanyDash from './components/CompanyDash';
import CompanyAddInfo from './components/CompanyAddInfo';
import Footer from './components/Footer';
import Gallery from './components/Gallery'
import AdventuresPage from './components/AdventuresPage';
import Team from './components/Team';

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

  useEffect(() => {
    getUserData()
    getCompanyData()
  }, []);

  function getUserData() {
    const token = localStorage.getItem("JWT");
    const username1 = localStorage.getItem("USERNAME");
    if (token && username1) {
      API.getProfile(username1, token).then(profileData => {
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
            Adventure_company: companyProfileData.data.Adventure_company,
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

  const submitForm = event => {
    event.preventDefault();
    API.login(loginFormState).then(newToken => {
      localStorage.setItem('JWT', newToken.data.token);
      localStorage.setItem('STREAM', newToken.data.appToken);
      localStorage.setItem('USERNAME', loginFormState.username);
      window.location.href = "/profile"
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
        console.error(err);
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

  const [signUpFormState, setUserSignUpFormState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: ""
  })

  const handleUserRegisterFormSubmit = event => {
    event.preventDefault();
    API.registerUser(signUpFormState).then(userData => {
      window.location.href = "/signin"
    })
  }

  const handleCompanyData = (companyProfileState) => {
    setCompanyProfileState({ ...companyProfileState, isCompanyLoggedIn: true });
  }

  const inputChangeRegister = event => {
    const { name, value } = event.target;
    setUserSignUpFormState({
      ...signUpFormState,
      [name]: value
    })
  }

  const [companyProfileState, setCompanyProfileState] = useState({
    username: "",
    email: "",
    token: "",
    id: "",
    Adventure_company: "",
    isCompanyLoggedIn: false
  })

  return (
    <Router>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar profile={profileState} setProfile={setProfileState} companyProfile={companyProfileState} setCompanyProfileState={setCompanyProfileState} />
        <Switch>
          <Route exact path="/registerUser">
            <UserSignUp handleUserRegFormSubmit={handleUserRegisterFormSubmit} inputChange={inputChangeRegister} form={signUpFormState} />
          </Route>
          <Route exact path="/profile" >
            {profileState.isLoggedIn ?
              <Profile profile={profileState} setProfile={setProfileState} /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/signin">
            {profileState.isLoggedIn ? <Redirect to="/profile" /> : <UserLogin handleFormSubmit={submitForm} inputChange={inputChange} form={loginFormState} />}
          </Route>
          <Route exact path="/adventures">
            {profileState.isLoggedIn ? <AdventuresPage /> : <UserLogin handleFormSubmit={submitForm} inputChange={inputChange} form={loginFormState} />}
          </Route>
          <Route path="/companydashboard/:companyname">
            <CompanyDash companyProfile={companyProfileState} setCompanyData={setCompanyProfileState} handleCompanyData={handleCompanyData} />
          </Route>
          <Route exact path="/companysignup">
            <CompanySignup />
          </Route>
          <Route exact path="/companylogin">
            <CompanyLogin companyProfile={companyProfileState} setCompanyProfileState={setCompanyProfileState} handleCompanyData={handleCompanyData} />
          </Route>
          <Route path="/companyaddinfo">
            <CompanyAddInfo />
          </Route>
          <Route exact path={["/", "/home"]}>
            <Hero />
            <div>
              <AdventureLanding />
              <Gallery />
            </div>
          </Route>
          <Route exact path='/team'>
            <Team></Team>
          </Route>
        </Switch>
        <Footer />
      </ThemeProvider>
    </Router>

  );
}

export default App;
