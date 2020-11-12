import React from 'react';
import { BrowserRouter as Router, Link as NavLink, Switch, Route } from 'react-router-dom'
import './Navbar.css'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  navbar: {
    paddingLeft: '20px',
    paddingTop: '40px',
    float: 'right',
  },
  image: {
    paddingTop: '20px'
  }
})


export default function Navbar() {
    const classes = useStyles();
    return (
        <Router>
            <div>
                <img className={classes.image} src={"https://via.placeholder.com/200x100.png"} alt='logo'/>
                <NavLink className={classes.navbar} to="/" color="inherit">
                    Home
            </NavLink>
                <NavLink className={classes.navbar} to="/about" color="inherit">
                    About
            </NavLink>
                <NavLink className={classes.navbar} to="/signin" color="inherit">
                    Sign In
            </NavLink>
            </div>




            <Switch>
                <Route path="/home">

                </Route>
                <Route path="/about">

                </Route>
                <Route path="/signin">

                </Route>
            </Switch>

        </Router>
    )
}
