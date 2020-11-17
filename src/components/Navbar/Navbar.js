import React from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Link as NavLink, Switch, Route } from 'react-router-dom'
import './Navbar.css'
import { makeStyles } from '@material-ui/styles';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { AppBar, Button, Toolbar, List, Divider, ListItem, ListItemIcon, ListItemText, IconButton, Drawer } from '@material-ui/core';
import Adventure from '../Adventure';
import Hero from '../Hero/Hero';
import Userlandingpost from '../Userlandingpost';
import Profile from '../Profile/Profile'
import ExploreIcon from '@material-ui/icons/Explore';
import StarIcon from '@material-ui/icons/Star';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';





const useStyles = makeStyles({
    appbar: {
        background: '#5085A5',
        opacity: '0.7',
        width: '100%',
    },
    navBtn: {
        background: '#687864',
        color: '#F7F9FB',
        marginLeft: '10px',
        opacity: '1.0',
        float: 'right',
    },
    toolbar: {
        float: 'right'
    },
    image: {
        paddingTop: '20px',
        paddingBottom: '20px',
        flexGrow: 1,
    },
    menuButton: {
        marginRight: '20px',

    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function Navbar() {

    const classes = useStyles();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, ['left']: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: 'left' === 'top' || 'left' === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
        >
            <List>
                {[{name:'My Profile', icon: <AccountCircleIcon/>, href:'/profile'}, {name: 'Adventures', icon:<ExploreIcon/>, href: '/adventures'}, {name: 'Favorite Adventures', icon: <StarIcon/>, href: '/myadventures'}].map((text) => (
                    <ListItemLink key={text} href={text.href}>
                        <ListItemIcon>{text.icon}</ListItemIcon>
                        <ListItemText primary={text.name} />
                    </ListItemLink>
                ))}
            </List>
            <Divider />
            <List>
                
                    <ListItem button onClick={console.log("hi there")}>
                        <ListItemIcon>{<ExitToAppIcon/>}</ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItem>
               
            </List>
        </div>
    );

    return (
        <Router>


            <AppBar className={classes.appbar} position="static">

                <Toolbar className={classes.toolbar}>




                    <React.Fragment key={'left'}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuOpenIcon onClick={toggleDrawer('left', true)}>{'left'}</MenuOpenIcon>
                        </IconButton>


                        <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                            {list('left')}
                        </Drawer>
                    </React.Fragment>

                    <img className={classes.image} src={"https://logoipsum.com/logo/logo-25.svg"} alt='logo' />



                    <NavLink to="/Login" edge="end">
                        <Button className={classes.navBtn}>Login</Button>
                    </NavLink>




                </Toolbar>
            </AppBar>






            <Switch>
                <Route path="/home">

                </Route>
                <Route path="/adventures">

                </Route>
                <Route path="/signin">

                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/">
                    <Hero></Hero>
                    <Adventure></Adventure>
                    <Userlandingpost></Userlandingpost>
                </Route>
            </Switch>

        </Router>
    )
}
