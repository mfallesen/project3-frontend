import React, { useEffect, useState } from 'react';
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
    FollowButton
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
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const header = () => {
    <UserBar
        avatar="https://placehold.it/100x100"
        username="Craig Many"
        subtitle="extinguising fires since 1999"
        timestamp="2018-09-19T07:44:11+00:00"
        onClickUser={() => console.log('clicked the user')}
    />
}

const client = stream.connect(process.env.REACT_APP_STREAM_API_KEY, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWNyb3cifQ.VBkmY5Jj7gurCqJLV69b4iOzxc7QTyAkLbKVYNvm6lg", process.env.REACT_APP_STREAM_APP_ID);





function Feed() {

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
                                        <LikeButton {...props} />
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
        []
    )

    const UserFollowers = () => {


        const classes = useStyles();
        const userOne = client.feed('timeline', client.userId);
        let somethingOut = undefined
        userOne.followers({ limit: '10', offset: '10' }).then((res) => {
            somethingOut = res.results
            console.log(somethingOut)
        });
        console.log(somethingOut)

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
                            <Grid item xs={6} sm={3} md={2}>
                                <Button>Button 4</Button>
                            </Grid>
                            <Grid item xs={6} sm={3} md={2}>
                                <Button>Button 4</Button>
                            </Grid>
                            <Grid item xs={6} sm={3} md={2}>
                                <Button>Button 4</Button>
                            </Grid>
                            <Grid item xs={6} sm={3} md={2}>
                                <Button>Button 4</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="lg">
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={4}>
                            <Feed />
                        </Grid>
                        <Grid item xs={12} sm={6} >

                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">
                                        Site Feed
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                {cards.map((card) => (
                                    <Grid item key={card} xs={12} sm={12} md={6} lg={6} >
                                        <Card className={classes.card} elevation={3}>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image="https://source.unsplash.com/random"
                                                title="Image title"
                                            />
                                            <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Heading
                                            </Typography>
                                                <Typography>
                                                    This is a media card. You can use this section to describe the content.
                                            </Typography>
                                            </CardContent>
                                            <CardActions>

                                                <FollowButton clicked={() => console.log('Followed!')} />

                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
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


                            <UserFollowers />


                        </Grid>
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
        </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
        </Typography>
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}


export default Profile;
