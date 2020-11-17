import React, { useEffect, useState } from 'react';
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


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}




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

const cards = [{
    actor: {
        data: {
            name: 'Nora Ferguson',
            profileImage: 'https://randomuser.me/api/portraits/women/72.jpg',
        },
    },
    verb: 'post',
    object: 'Just came back from this hike! ',
    image:
        'https://handluggageonly.co.uk/wp-content/uploads/2017/08/IMG_0777.jpg',
    time: new Date(),
}, {
    actor: {
        data: {
            name: 'Nora Ferguson',
            profileImage: 'https://randomuser.me/api/portraits/women/72.jpg',
        },
    },
    verb: 'post',
    object: 'Just came back from this hike! ',
    image:
        'https://handluggageonly.co.uk/wp-content/uploads/2017/08/IMG_0777.jpg',
    time: new Date(),
}, {
    actor: {
        data: {
            name: 'Nora Ferguson',
            profileImage: 'https://randomuser.me/api/portraits/women/72.jpg',
        },
    },
    verb: 'post',
    object: 'Just came back from this hike! ',
    image:
        'https://handluggageonly.co.uk/wp-content/uploads/2017/08/IMG_0777.jpg',
    time: new Date(),
}];



const client = stream.connect(process.env.REACT_APP_STREAM_API_KEY, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWNyb3cifQ.VBkmY5Jj7gurCqJLV69b4iOzxc7QTyAkLbKVYNvm6lg", process.env.REACT_APP_STREAM_APP_ID);

function Feed() {
    const profileImage = "andrew_crow_2x_dpitw4.jpg"
    client.user('acrow').update({ name: "Andrew Crow", occupation: "Software Engineer", gender: "male", profileImage: `https://res.cloudinary.com/crowandrew/image/upload/w_400,h_400,c_crop,g_face,r_max/w_150/v1603932299/portfolio/${profileImage}` });
    return (
        <div >
            <StreamApp
                apiKey={process.env.REACT_APP_STREAM_API_KEY}
                appId={process.env.REACT_APP_STREAM_APP_ID}
                token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWNyb3cifQ.VBkmY5Jj7gurCqJLV69b4iOzxc7QTyAkLbKVYNvm6lg"
            >

                <StatusUpdateForm feedGroup="timeline" Header="Status Update" />
                <Typography variant="h5">
                    Personal Feed
                    </Typography>
                <Paper elevation={3}>
                    <FlatFeed
                        options={{ reactions: { recent: true } }}
                        notify
                        Activity={(props) => (
                            <Activity

                                {...props}
                                Footer={() => (
                                    <div style={{ padding: "8px 16px" }}>
                                        <Grid container>
                                            <Grid item xs={8}>
                                                <LikeButton {...props} />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <RepostButton {...props} />
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
                        )}
                    />
                </Paper>
            </StreamApp>
        </div>
    );
}


function Profile() {
    const classes = useStyles();

    const UserImage = () => {
        const profileImage = "andrew_crow_2x_dpitw4.jpg"
        const altName = "Andrew Crow"
        return <img alt={altName} src={`https://res.cloudinary.com/crowandrew/image/upload/w_400,h_400,c_crop,g_face,r_max/w_150/v1603932299/portfolio/${profileImage}`} alt="Logo" />
    }

    const Name = () => {
        let fullName = "Andrew Crow"
        return fullName
    }

    const AdventureStatement = () => {
        const adventureStatement = "Looking to explore the world one hike at a time"
        return adventureStatement
    }

    useEffect(() => {

    });

    const [followerList, setFollowersList] = useState(
        [1, 2, 3, 4, 5, 6, 7, 8, 9]
    )

    const UserFollowers = () => {


        const classes = useStyles();
        const userOne = client.feed('timeline', client.userId);
        userOne.follow('user', 'ccrow')
        userOne.following({ offset: 0, limit: 10 }).then((res) => {
            console.log(res.results)
        })
        userOne.followStats().then((res) => {
            console.log(res);
        })




        return (
            <Grid container spacing={1}>
                {followerList.map((follower) => (
                    <Grid item xs={12}>
                        <Card className={classes.card} elevation={3}>

                            <CardContent className={classes.cardContent}>
                                <Typography variant="subtitle2">
                                    Stacy Adams
                            </Typography>
                            </CardContent>
                        </Card>
                    </ Grid >
                ))}
            </Grid>
        )


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
                                        <Button>Edit</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} sm={3} md={3}>
                                <Button>Activity Feed</Button>
                            </Grid>
                            <Grid item xs={6} sm={3} md={3}>
                                <Button>Add Activity</Button>
                            </Grid>
                            <Grid item xs={6} sm={3} md={3}>
                                <Button>Fav Adventures</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="lg">
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={5}>
                            <Feed />
                        </Grid>
                        <Grid item xs={12} sm={5} >

                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">
                                        Activity Feed
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <StreamApp
                                    apiKey={process.env.REACT_APP_STREAM_API_KEY}
                                    appId={process.env.REACT_APP_STREAM_APP_ID}
                                    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWNyb3cifQ.VBkmY5Jj7gurCqJLV69b4iOzxc7QTyAkLbKVYNvm6lg"
                                >
                                    {cards.map((card) => (
                                        <Grid item key={card} xs={12} sm={12} md={12} lg={12} >
                                            <Activity
                                                onClickHashtag={(word) => console.log(`clicked on ${word}`)}
                                                activity={card}
                                                Footer={<ActivityFooter userId="123" activity={card} />}
                                            />;
                                        </Grid>
                                    ))}
                                </StreamApp>
                            </Grid>

                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">
                                        Followers
                                    </Typography>
                                </Grid>
                            </Grid>
                            <StreamApp
                                apiKey={process.env.REACT_APP_STREAM_API_KEY}
                                appId={process.env.REACT_APP_STREAM_APP_ID}
                                token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWNyb3cifQ.VBkmY5Jj7gurCqJLV69b4iOzxc7QTyAkLbKVYNvm6lg"
                            >

                                <UserBar

                                    username="ccrow"

                                />
                            </StreamApp>

                        </Grid>
                    </Grid>
                </Container>
            </main>

        </React.Fragment>
    );
}


export default Profile;