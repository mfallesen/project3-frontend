import React from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Link as NavLink, Switch, Route } from 'react-router-dom'
import './Navbar.css'
import { makeStyles } from '@material-ui/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { AppBar, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from '@material-ui/core/Drawer';
import Adventure from '../Adventure';
import Footer from '../Footer';
import Hero from '../Hero/Hero';
import Userlandingpost from '../Userlandingpost';
import Profile from '../../pages/Profile'






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
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
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



                    <NavLink to="/signin" edge="end">
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
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/">
                    <Hero></Hero>
                    <Adventure></Adventure>
                    <Userlandingpost></Userlandingpost>
                    <Footer></Footer>
                </Route>
            </Switch>

        </Router>
    )
}
