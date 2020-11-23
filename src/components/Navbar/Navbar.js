import React from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Link as NavLink, Redirect } from 'react-router-dom'
import './Navbar.css'
import { makeStyles, withStyles } from '@material-ui/styles';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { AppBar, Button, Toolbar, List, Divider, ListItem, ListItemIcon, ListItemText, IconButton, Drawer, Grid } from '@material-ui/core';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";


const useStyles = makeStyles({
    appbar: {
        background: 'rgb(247,249,251, 0.7)',
        opacity: '0.9999'
    },
    navBtn: {
        background: '#687864',
        color: '#F7F9FB',
        marginLeft: '10px',
        opacity: '1.0',
        float: 'right',
    },
    image: {
        paddingTop: '20px',
        paddingBottom: '20px',
        flexGrow: 1,
    },

    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const StyledMenuOpenIcon = withStyles({
    root: {
        background: '#687864',
        color: '#F7F9FB',
        borderRadius: 5,
        boxSizing: 'initial',
        padding: 6,
    },

})(MenuOpenIcon);

export default function Navbar(props) {

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

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, ['left']: open });
    };

    const list = () => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: 'left' === 'top' || 'left' === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
        >
            <List>
                {[{ name: 'My Profile', icon: <AccountCircleIcon />, href: '/profile' }, { name: 'Adventures', icon: <ExploreIcon />, href: '/adventures' }].map((text) => (
                    <ListItemLink key={text} href={text.href}>
                        <ListItemIcon>{text.icon}</ListItemIcon>
                        <ListItemText primary={text.name} />
                    </ListItemLink>
                ))}
            </List>
            <Divider />
            <List>

                <ListItem button >
                    <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
                    <ListItemText primary={'Logout'} onClick={logout} />
                    <Redirect to="/" />
                </ListItem>

            </List>
        </div>
    );

    const companylist = () => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: 'left' === 'top' || 'left' === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
        >
            <List>
                {[{ name: 'My Dashboard', icon: <AccountCircleIcon />, href: '/companydashboard/'+localStorage.getItem("USERNAMECOMPANY") }, { name: 'New Employee', icon: <ExploreIcon />, href: '/companysignup' }].map((text) => (
                    <ListItemLink key={text} href={text.href}>
                        <ListItemIcon>{text.icon}</ListItemIcon>
                        <ListItemText primary={text.name} />
                    </ListItemLink>
                ))}
            </List>
            <Divider />
            <List>

                <ListItem button >
                    <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
                    <ListItemText primary={'Logout'} onClick={logout} />
                    <Redirect to="/" />
                </ListItem>

            </List>
        </div>
    );
    const logout = () => {
        localStorage.removeItem("JWT");
        localStorage.removeItem("USERNAME");
        localStorage.removeItem("JWTCOMPANY");
        localStorage.removeItem("USERNAMECOMPANY");
        window.location.href = "/home";
    }
    const login = () => {
        window.location.href = "/signin";
    }

    return (
        <Router>

            <AppBar className={classes.appbar} position="static">

                <Toolbar className={classes.toolbar}>
                    <Grid container justify='space-between' alignItems='center'>
                        
                        <Grid item >
                        <React.Fragment key={'left'}>
                                {props.profile.isLoggedIn || props.companyProfile.isCompanyLoggedIn? <IconButton edge="start" color="primary" aria-label="menu">
                                    <MenuOpenIcon color='primary' onClick={toggleDrawer('left', true)}>{'left'}</MenuOpenIcon>
                                </IconButton> : <StyledMenuOpenIcon color="primary" />}

                                {props.profile.isLoggedIn ?<Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                                    {list('left')}
                                </Drawer>: <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                                    {companylist('left')}
                                </Drawer>}
                            </React.Fragment>
                        </Grid>
                        <Grid item >
                            
                            {props.profile.isLoggedIn || props.companyProfile.isCompanyLoggedIn ?
                            <Button href='/adventures'>
                                
                            <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}>
                                <Image publicId="minnesvart/logo_rdvtg7.png" >
                                    <Transformation width="200" crop="fill" />
                                </Image>
                            </CloudinaryContext>
                            </Button>
                            :
                            <Button href='/'>
                                
                            <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}>
                                <Image publicId="minnesvart/logo_rdvtg7.png" >
                                    <Transformation width="200" crop="fill" />
                                </Image>
                            </CloudinaryContext>
                            </Button>
                            }
                        </Grid>

                        <Grid item >
                            {props.profile.isLoggedIn || props.companyProfile.isCompanyLoggedIn ?
                                <NavLink to="/" edge="end"><Button className={classes.navBtn} onClick={logout}>Logout</Button> </NavLink>
                                :
                                <NavLink to="/signin" edge="end"><Button onClick={login} className={classes.navBtn}>Login</Button> </NavLink>}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>


        </Router >
    )
}
