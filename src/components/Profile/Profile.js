import React, { useEffect, useState } from 'react';
import {
    StreamApp,
    FlatFeed,
    LikeButton,
    Activity,
    CommentList,
    CommentField,
    StatusUpdateForm,
    FollowButton,
} from "react-activity-feed";
import stream from 'getstream';
import "react-activity-feed/dist/index.css";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import API from '../../utils/API';
import UserPost from '../UserPost'
import TextField from '@material-ui/core/TextField';
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import { openUploadWidget } from "../Cloudinary/CloudinaryService";
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FavAdventuresPage from '../FavAdventuresPage';

const streamString = localStorage.getItem('STREAM');
const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroText: {
        marginTop: theme.spacing(0),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    followGrids: {
        padding: theme.spacing(1),
        height: theme.spacing(5)
    },
    buttonWidth: {
        width: 170
    }
}));

// Connection to client for getStream.io
const client = stream.connect(process.env.REACT_APP_STREAM_API_KEY, streamString, process.env.REACT_APP_STREAM_APP_ID);

// Left side personal feed
function Feed(props) {

    client.user(client.userId).update({ name: `${props.profile.first_name} ${props.profile.last_name}`, profileImage: `https://res.cloudinary.com/crowandrew/image/upload/w_400,h_400,c_crop,g_face,r_max/w_150/v1603932299/${props.profile.image}` });
    return (
        <div >
            <StreamApp
                apiKey={process.env.REACT_APP_STREAM_API_KEY}
                appId={process.env.REACT_APP_STREAM_APP_ID}
                token={streamString}
            >

                <StatusUpdateForm feedGroup="timeline" Header="Status Update" />
                <Typography variant="h5">
                    Personal Feed
                    </Typography>

                <FlatFeed
                    options={{ reactions: { recent: true } }}
                    notify
                    paginator
                    Activity={(props) => (
                        <Paper elevation={3}>
                            <Activity

                                {...props}
                                Footer={() => (
                                    <div style={{ padding: "8px 16px" }}>
                                        <Grid container>
                                            <Grid item xs={8}>
                                                <LikeButton {...props} />
                                            </Grid>
                                            <Grid item xs={4}>
                                                {/* <RepostButton {...props} /> */}
                                            </Grid>
                                        </Grid>
                                        <CommentField
                                            activity={props.activity}
                                            onAddReaction={props.onAddReaction}
                                        />
                                        <CommentList activityId={props.activity.id} />
                                    </div>
                                )}
                            />
                        </Paper>
                    )}
                />

            </StreamApp>
        </div>
    );
}

// This is the default export component
function Profile(props) {
    const classes = useStyles();

    const largeScreen = useMediaQuery('(min-width:600px)')

    // State for activities in middle of screen, followers on the right, read only for forms and navigation
    const [activitiesState, setActivitiesState] = useState([])
    const [followerListState, setFollowerListState] = useState([])
    const [followingListState, setFollowingListState] = useState([])
    const [readOnlyEditState, setReadOnlyEditState] = useState(true)
    const [viewPanelState, setViewPanelState] = useState("activityFeed")

    // function to to change fields to be editable
    const editProfile = () => {
        setReadOnlyEditState(false)
    }

    // function for navigation butttons
    const viewPanelChange = (panelName) => {
        setViewPanelState(panelName)
        if (panelName === "activityFeed") {
            Activities()
        }
    }

    // function to change state of save profile
    const saveProfile = () => {
        setReadOnlyEditState(true)
    }

    // input change handler for the profile save form
    const inputChange = event => {
        const { name, value } = event.target;
        props.setProfile({
            ...props.profile,
            [name]: value
        })
    }

    // form submit handler for saving the profile data
    const handleFormSubmit = event => {
        event.preventDefault();
        const token = localStorage.getItem("JWT")
        const userName = localStorage.getItem("USERNAME")
        API.updateUserInfo(props.profile, userName, token).then(userData => {
        }).then(() => {
            saveProfile()
        })

    }

    // function to query getStream.io for activity data the renders in middle of page
    const Activities = () => {
        const token = localStorage.getItem("JWT")

        API.getActivities(token).then(activityData => {
            let siteActivities = []
            activityData.data.map(activity => {

                let activityObj = {
                    actor: {
                        data: {
                            name: activity.name,
                            profileImage: `https://res.cloudinary.com/crowandrew/image/upload/w_400,h_400,c_crop,g_face,r_max/w_150/v1603932299/${activity.profileImage}`,
                            userId: activity.user
                        },
                    },
                    verb: activity.verb,
                    object: activity.object,
                    image:
                        activity.image,
                    time: activity.time,
                }
                siteActivities.push(activityObj)
            })
            setActivitiesState(siteActivities)

        })
    }

    // loading activities and following stats from getStream.io
    useEffect(() => {
        Activities()
        UserFollowing()
        UserFollowers()
    }, []);

    // function pulling following data from getStream.io
    const UserFollowing = () => {
        const userOne = client.feed('timeline', client.userId);
        userOne.following().then((res) => {

            let List = []
            for (let i = 0; i < res.results.length; i++) {
                const user = res.results[i].target_id.slice(9);
                List.push(user)
            }
            setFollowingListState(List)

        }).catch((err) => {
            console.error(err)
        })
    }

    // function pulling follower data from getStream.io   
    const UserFollowers = () => {
        const userOne = client.feed('timeline', client.userId);
        userOne.followers().then((res) => {
            let List = []
            for (let i = 0; i < res.results.length; i++) {
                const user = res.results[i].feed_id.slice(9);
                List.push(user)
            }
            setFollowerListState(List)

        }).catch((err) => {
            console.error(err)
        })
    }

    // function to follow a user from the main activity in middle of page
    const followerUser = (userToFollow) => {
        const userOne = client.feed('timeline', client.userId);
        userOne.follow('timeline', userToFollow)
        UserFollowing()
        UserFollowers()
        Activities()
    }

    const unfollowerUser = (userToUnFollow) => {
        const userOne = client.feed('timeline', client.userId);
        userOne.unfollow('timeline', userToUnFollow, { keepHistory: true })
        UserFollowing()
        UserFollowers()
        Activities()
    }

    // function to call Cloudinary widget to upload profile photo
    const beginUpload = tag => {
        const uploadOptions = {
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
            tags: [tag, 'anImage'],
            uploadPreset: process.env.REACT_APP_CLOUDINARY_PRESET,
        };
        openUploadWidget(uploadOptions, (error, photos) => {
            if (!error) {
                if (photos.event === 'success') {
                    props.setProfile({
                        ...props.profile,
                        image: photos.info.public_id
                    })
                }
            } else {
                console.error(error);
            }
        })
    }

    const FollowingComponent = () => {
        return <Grid item xs={12} sm={2}>
            <Grid container spacing={1}>
                <Grid item xs={12}>

                    <Typography variant="h6">
                        Following {followingListState.length}
                    </Typography>

                </Grid>
            </Grid>
            <Grid container spacing={1}>
                {followingListState.slice(0, 10).map((follower) => (
                    <Grid item xs={12}>
                        <Paper>
                            <Grid container className={classes.followGrids}>
                                <Grid item xs={10}>
                                    <Typography variant="subtitle2">
                                        {follower}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton color="secondary" aria-label="add an alarm" size="small">
                                        <HighlightOffIcon onClick={() => unfollowerUser(follower)} fontSize="inherit" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    </ Grid >
                ))}
            </Grid>
        </Grid>

    }

    const FollowerComponent = () => {
        return <Grid item xs={12} sm={2} >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        Followers {followerListState.length}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                {followerListState.slice(0, 10).map((follower) => (
                    <Grid item xs={12}>
                        <Paper>
                            <Grid container className={classes.followGrids}>
                                <Grid item xs={12}>

                                    <Typography variant="subtitle2">
                                        {follower}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </ Grid >
                ))}
            </Grid>
        </Grid >
    }

    const ActivityFeed = () => {
        return <Grid item xs={12} sm={4} >

            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Activity Feed
                                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                    <StreamApp
                        apiKey={process.env.REACT_APP_STREAM_API_KEY}
                        appId={process.env.REACT_APP_STREAM_APP_ID}
                        token={streamString}
                    >

                        <Grid container spacing={1}>
                            {activitiesState.map((activity) => (
                                <Grid item xs={12}>
                                    <Paper elevation={3}>
                                        <Activity
                                            activity={activity}
                                        />

                                        {followingListState.includes(activity.actor.data.userId) ? <FollowButton followed onClick={() => unfollowerUser(activity.actor.data.userId)} /> : <FollowButton onClick={() => followerUser(activity.actor.data.userId)} />}

                                    </Paper>
                                </ Grid >
                            ))}
                        </Grid>

                    </StreamApp>
                </Grid>
            </Grid>


        </Grid>
    }

    // return jsx to render on page
    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <form onSubmit={handleFormSubmit} noValidate>
                            <Grid container spacing={3} >

                                <Grid item xs={12} sm={5} lg={3} >

                                    {readOnlyEditState ?
                                        <img alt={props.profile.first_name} src={`https://res.cloudinary.com/crowandrew/image/upload/w_500,h_500,c_crop,g_face,r_max/w_150/v1603932299/${props.profile.image}`} alt="Logo" />
                                        : <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}>

                                                    <Image
                                                        publicId={props.profile.image}
                                                        fetch-format="auto"
                                                        quality="auto"
                                                    >
                                                        <Transformation gravity="face" height="500" radius="max" width="500" crop="crop" />
                                                        <Transformation width="150" crop="scale" />
                                                    </Image>
                                                </CloudinaryContext>
                                            </Grid>
                                            <Grid item xs={12}>

                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => beginUpload("image")}>Upload Profile Pic</Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="image"
                                                    label="Image"
                                                    name="image"
                                                    disabled="true"
                                                    autoComplete="image"
                                                    onChange={inputChange}
                                                    value={props.profile.image}
                                                />
                                            </Grid>
                                        </Grid>
                                    }
                                </Grid>
                                <Grid item xs={12} sm={7} lg={9} >

                                    <Grid container spacing={2}>
                                        <Grid item xs={10} className={classes.heroText}>
                                            <Typography variant="h4">
                                                {readOnlyEditState ? props.profile.first_name + " " + props.profile.last_name : <Grid container spacing={2}><Grid item={6}><TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="first_name"
                                                    label="First Name"
                                                    name="first_name"
                                                    autoComplete="first_name"
                                                    onChange={inputChange}

                                                    value={props.profile.first_name}
                                                /></Grid><Grid item={6}><TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="last_name"
                                                    label="Last Name"
                                                    name="last_name"
                                                    autoComplete="last_name"
                                                    onChange={inputChange}

                                                    value={props.profile.last_name}
                                                /></Grid></Grid>}
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                {readOnlyEditState ? props.profile.city + ", " + props.profile.state : <Grid container spacing={2}><Grid item={6}><TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="city"
                                                    label="City"
                                                    name="city"
                                                    autoComplete="city"
                                                    onChange={inputChange}

                                                    value={props.profile.city}
                                                /></Grid><Grid item={6}><TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="state"
                                                    label="State"
                                                    name="state"
                                                    autoComplete="state"
                                                    onChange={inputChange}

                                                    value={props.profile.state}
                                                /></Grid>
                                                    <Grid item={6}><TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        label="Email"
                                                        name="email"
                                                        autoComplete="email"
                                                        onChange={inputChange}

                                                        value={props.profile.email}
                                                    /></Grid></Grid>}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={2}>
                                            {readOnlyEditState ? <Button color="primary" variant="contained" onClick={() => { editProfile() }}>Edit</Button> : <Button color="secondary" variant="contained" onClick={handleFormSubmit} >Save</Button>}
                                        </Grid>

                                    </Grid>

                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Button className={classes.buttonWidth} color="primary" variant="contained" onClick={() => { viewPanelChange("activityFeed") }}>Activity Feed</Button>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Button className={classes.buttonWidth} color="primary" variant="contained" onClick={() => { viewPanelChange("addActivity") }}>Add Activity</Button>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Button className={classes.buttonWidth} color="primary" variant="contained" onClick={() => { viewPanelChange("favAdventures") }}>Fav Adventures</Button>
                                </Grid>
                                {!largeScreen ?
                                    <Grid item xs={6} sm={4} md={3}>
                                        <Button className={classes.buttonWidth} color="primary" variant="contained" onClick={() => { viewPanelChange("followPanel") }}>Follow</Button>
                                    </Grid>
                                    : " "}
                                {!largeScreen ?
                                    <Grid item xs={12} sm={4} md={3}>
                                        <Button className={classes.buttonWidth} color="primary" variant="contained" onClick={() => { viewPanelChange("personalFeed") }}>Personal Feed</Button>
                                    </Grid>
                                    : " "}
                            </Grid>
                        </form>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="lg">
                    <Grid container spacing={1} >
                        {viewPanelState === "activityFeed" && !largeScreen ? <ActivityFeed /> : ""}
                        {viewPanelState === "addActivity" && !largeScreen ? <Grid item xs={12}><UserPost /></Grid> : ""}
                        {viewPanelState === "favAdventures" && !largeScreen ? <Grid item xs={12}><FavAdventuresPage /></Grid> : ""}
                        {viewPanelState === "followPanel" && !largeScreen ? <FollowingComponent /> : " "}
                        {viewPanelState === "followPanel" && !largeScreen ? <FollowerComponent /> : " "}
                        {viewPanelState === "personalFeed" && !largeScreen ? <Grid item xs={12} sm={4}>

                            <Feed profile={props.profile} />

                        </Grid> : " "}
                        {largeScreen ?
                            <Grid item xs={12} sm={4}>

                                <Feed profile={props.profile} />

                            </Grid>
                            : " "}
                        {viewPanelState === "activityFeed" && largeScreen ? <ActivityFeed /> : ""}
                        {viewPanelState === "addActivity" && largeScreen ? <Grid item xs={12} sm={4} ><UserPost /></Grid> : ""}
                        {viewPanelState === "favAdventures" && largeScreen ? <Grid item xs={12} sm={4} ><FavAdventuresPage profile={props.profile} /></Grid> : ""}
                        {largeScreen ?
                            <FollowingComponent />
                            : " "}
                        {largeScreen ?
                            <FollowerComponent />
                            : " "}
                    </Grid>
                </Container>
            </main>

        </React.Fragment>
    );
}

export default Profile;