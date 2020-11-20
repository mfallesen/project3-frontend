import React from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Link as NavLink, Switch, Route, Redirect } from 'react-router-dom'
import './Navbar.css'
import { makeStyles } from '@material-ui/styles';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { AppBar, Button, Toolbar, List, Divider, ListItem, ListItemIcon, ListItemText, IconButton, Drawer } from '@material-ui/core';
import AdventureLanding from '../AdventureLanding';
import Hero from '../Hero/Hero';
import Userlandingpost from '../Userlandingpost';
import Profile from '../Profile/Profile'
import ExploreIcon from '@material-ui/icons/Explore';
import StarIcon from '@material-ui/icons/Star';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AdventuresPage from '../AdventuresPage/AdventuresPage';
import CompanySignup from '../CompanySignup'
import CompanyLogin from '../CompanyLogin'
import CompanyAddInfo from '../CompanyAddInfo';
import UserLogin from '../UserLogin';
import CompanyDash from '../CompanyDash'


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

export default function Navbar(props) {

    const classes = useStyles();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const [companyData, setCompanyData] = React.useState({
        auth: false,
        email: "",
        message: "",
        password: "",
        username: "",
        isCompanyLoggedIn: false
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
                {[{ name: 'My Profile', icon: <AccountCircleIcon />, href: '/profile' }, { name: 'Adventures', icon: <ExploreIcon />, href: '/adventures' }, { name: 'Favorite Adventures', icon: <StarIcon />, href: '/myadventures' }].map((text) => (
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

    const handleCompanyData = (companyData) => {
        setCompanyData({...companyData, isCompanyLoggedIn: true});
        // console.log("Company Data: ", companyData);
    }
    return (
        <Router>

            <AppBar className={classes.appbar} position="static">

                <Toolbar className={classes.toolbar}>

                    <React.Fragment key={'left'}>
                        {props.profile.isLoggedIn ? <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuOpenIcon onClick={toggleDrawer('left', true)}>{'left'}</MenuOpenIcon>
                        </IconButton> : <MenuOpenIcon />}


                        <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                            {list('left')}
                        </Drawer>
                    </React.Fragment>

                    <img className={classes.image} src={"https://logoipsum.com/logo/logo-25.svg"} alt='logo' />

                    {props.profile.isLoggedIn || companyData.isCompanyLoggedIn ?
                        <NavLink to="/" edge="end"><Button className={classes.navBtn} onClick={logout}>Logout</Button> </NavLink>
                        :
                        <NavLink to="/signin" edge="end"><Button className={classes.navBtn}>Login</Button> </NavLink>}

                </Toolbar>
            </AppBar>


            <Switch>
                <Route path="/companydashboard/:companyusername">
                    
                    <CompanyDash setCompanyData={setCompanyData }handleCompanyData={handleCompanyData}/>
                </Route>

                <Route path="/companysignup">
                    <CompanySignup />
                </Route>
                <Route path="/companylogin">
                    <CompanyLogin />
                </Route>
                <Route path="/companyaddinfo">
                    <CompanyAddInfo />
                </Route>

                <Route path="/adventures">
                    {props.profile.isLoggedIn ?
                        <AdventuresPage></AdventuresPage> : "To see adventures, please sign in first"}
                </Route>
                <Route path="/profile" >
                    {props.profile.isLoggedIn ?
                        <Profile profile={props.profile} setProfile={props.setProfile} /> : "You must sign in before seeing profile data"}
                </Route>
                <Route path={["/", "/home"]}>
                    <Hero />
                    {props.profile.isLoggedIn ?
                        <AdventureLanding>
                            <Userlandingpost />
                        </AdventureLanding>
                        : "Please sign in first"}
                </Route>
                <Route path="/signin">

                </Route>
                <Route path = "/companydash">

                </Route>
            </Switch>

        </Router >
    )
}