import React, { useEffect, useState, useRef } from 'react';
import './Profile.css';
import {
    StreamApp,
    NotificationDropdown,
    FlatFeed,
    LikeButton,
    Activity,
    CommentList,
    CommentField,
    StatusUpdateForm,
    RepostButton,
    UserBar,
    EmojiPicker,
    FollowButton,
    DataLabel,
    ActivityFooter
} from "react-activity-feed";
import stream from 'getstream';
import "react-activity-feed/dist/index.css";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import API from '../../utils/API';
import Box from '@material-ui/core/Container'
import UserPost from '../UserPost'





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

}));

const client = stream.connect(process.env.REACT_APP_STREAM_API_KEY, streamString, process.env.REACT_APP_STREAM_APP_ID);

function Feed(props) {


    client.user(client.userId).update({ name: `${props.profile.first_name} ${props.profile.last_name}`, profileImage: `https://res.cloudinary.com/crowandrew/image/upload/w_400,h_400,c_crop,g_face,r_max/w_150/v1603932299/portfolio/${props.profile.image}` });
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


function Profile(props) {
    const classes = useStyles();

    const [activitiesState, setActivitiesState] = useState([])
    const [followerListState, setFollowerListState] = useState([])
    const [followingListState, setFollowingListState] = useState([])
    const [readOnlyEditState, setReadOnlyEditState] = useState(true)
    const [viewPanelState, setViewPanelState] = useState("activityFeed")

    const editProfile = () => {
        console.log("EDIT PROFILE")
    }



    const viewPanelChange = (panelName) => {
        setViewPanelState(panelName)
    }

    const UserImage = () => {
        const altName = `${props.profile.first_name} ${props.profile.last_name}`
        return <img alt={altName} src={`https://res.cloudinary.com/crowandrew/image/upload/w_400,h_400,c_crop,g_face,r_max/w_150/v1603932299/portfolio/${props.profile.image}`} alt="Logo" />
    }

    const Name = () => {
        let fullName = `${props.profile.first_name} ${props.profile.last_name}`
        return fullName
    }

    const AdventureStatement = () => {
        const adventureStatement = "Looking to explore the world one hike at a time"
        return adventureStatement
    }

    const Activities = () => {
        const token = localStorage.getItem("JWT")


        API.getActivities(token).then(activityData => {
            let siteActivities = []
            activityData.data.map(activity => {

                let activityObj = {
                    actor: {
                        data: {
                            name: activity.name,
                            profileImage: `https://res.cloudinary.com/crowandrew/image/upload/w_400,h_400,c_crop,g_face,r_max/w_150/v1603932299/portfolio/${activity.profileImage}`,
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
            console.log(siteActivities);
            setActivitiesState(siteActivities)

        })
    }

    useEffect(() => {
        Activities()
        UserFollowing()
        UserFollowers()
    }, []);



    const UserFollowing = () => {
        const userOne = client.feed('timeline', client.userId);
        userOne.following().then((res) => {

            let List = []
            for (let i = 0; i < res.results.length; i++) {
                const user = res.results[i].target_id.slice(5);
                List.push(user)
            }
            console.log(List)
            setFollowingListState(List)

        }).catch((err) => {
            console.log(err)
        })
    }

    const UserFollowers = () => {
        const userOne = client.feed('timeline', client.userId);
        userOne.followers().then((res) => {

            let List = []
            for (let i = 0; i < res.results.length; i++) {
                const user = res.results[i].target_id.slice(5);
                List.push(user)
            }
            console.log(List)
            setFollowerListState(List)

        }).catch((err) => {
            console.log(err)
        })
    }


    const followerUser = (userToFollow) => {
        const userOne = client.feed('timeline', client.userId);
        userOne.follow('user', userToFollow)
        console.log("Followed: ", userToFollow)
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={5} lg={3} >
                                <UserImage />
                            </Grid>
                            <Grid item xs={12} sm={7} lg={9}>


                                <Grid container spacing={2}>
                                    <Grid item xs={10} className={classes.heroText}>
                                        <Typography variant="h4">
                                            <Name />
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            <AdventureStatement />
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button onClick={() => { editProfile() }}>Edit</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} sm={3} md={3}>
                                <Button onClick={() => { viewPanelChange("activityFeed") }}>Activity Feed</Button>
                            </Grid>
                            <Grid item xs={6} sm={3} md={3}>
                                <Button onClick={() => { viewPanelChange("addActivity") }}>Add Activity</Button>
                            </Grid>
                            <Grid item xs={6} sm={3} md={3}>
                                <Button onClick={() => { viewPanelChange("favAdventures") }}>Fav Adventures</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="lg">
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={4}>

                            <Feed profile={props.profile} />

                        </Grid>
                        {viewPanelState === "activityFeed" ?
                            <Grid item xs={12} sm={4} >

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
                                                            <FollowButton onClick={() => followerUser(activity.actor.data.userId)} />

                                                        </Paper>
                                                    </ Grid >
                                                ))}
                                            </Grid>

                                        </StreamApp>
                                    </Grid>
                                </Grid>


                            </Grid> : ""}
                        {viewPanelState === "addActivity" ? <Grid item xs={12} sm={4} ><UserPost /></Grid> : ""}
                        {viewPanelState === "favAdventures" ? <Grid item xs={12} sm={4} ><div>Fav Adventures</div></Grid> : ""}
                        <Grid item xs={12} sm={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">
                                        Following {followingListState.length}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                {followingListState.slice(0, 10).map((follower) => (
                                    <Grid item xs={12}>
                                        <Card className={classes.card} elevation={3}>

                                            <CardContent className={classes.cardContent}>
                                                <Typography variant="subtitle2">
                                                    {follower}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </ Grid >
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">
                                        Followers {followerListState.length}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                {followerListState.slice(0, 10).map((follower) => (
                                    <Grid item xs={12}>
                                        <Card className={classes.card} elevation={3}>

                                            <CardContent className={classes.cardContent}>
                                                <Typography variant="subtitle2">
                                                    {follower}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </ Grid >
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </main>

        </React.Fragment>
    );
}


export default Profile;