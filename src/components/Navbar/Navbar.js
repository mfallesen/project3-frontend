import React from 'react';
import { BrowserRouter as Router, Link as NavLink, Switch, Route } from 'react-router-dom'
import './Navbar.css'


export default function Navbar() {
    return (
        <Router>
            <div>
                <img src={""} alt='logo'/>
                <NavLink to="/" color="inherit">
                    Home
            </NavLink>
                <NavLink to="/about" color="inherit">
                    About
            </NavLink>
                <NavLink to="/signin" color="inherit">
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
