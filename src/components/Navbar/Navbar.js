import React from 'react';
import { BrowserRouter as Router, Link as NavLink, Switch, Route } from 'react-router-dom'
import './Navbar.css'
import { makeStyles } from '@material-ui/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { AppBar, Button } from '@material-ui/core';



const useStyles = makeStyles({
    appbar: {
        background: '#5085A5',
        opacity: '0.7',
    },
    navBtn: {
        background:  '#687864',
        color: '#F7F9FB',
        marginLeft: '10px',
        opacity: '1.0',
        float: 'right',
    },
    toolbar: {
        float:'right'
    },
    image: {
        paddingTop: '20px',
        paddingBottom: '20px'
    },
    menuButton: {
        marginRight: '20px',
        
    },
});

export default function Navbar() {

    const classes = useStyles();

    return (
        <Router>
            

            <AppBar className={classes.appbar} position="static">
                <Toolbar className={classes.toolbar}>
                    <img className={classes.image} src={"https://via.placeholder.com/200x100.png"} alt='logo' />
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuOpenIcon />
                    </IconButton>

                    <NavLink to="/">
                        <Button className={classes.navBtn}>Home</Button>  
                    </NavLink>
                    <NavLink to="/about" >
                        <Button className={classes.navBtn}>About</Button>  
                    </NavLink>
                    <NavLink to="/signin" >
                        <Button className={classes.navBtn}>Login</Button>
                    </NavLink>



                </Toolbar>
            </AppBar>






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
