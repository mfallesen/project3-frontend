import {Grid,} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import UserPostCard from '../UserPostCard'

const useStyles = makeStyles({
    cardRow: {
        margin: 0,
    }
});

export default function Userlandingpost() {
    const classes = useStyles();  
    
    const userPosts = [
        {
            title: "Amazing",
            image: "https://picsum.photos/150/200",
            text: "It was an amazing trip"
        },
        {
            title: "Super Fun!",
            image: "https://picsum.photos/150/200",
            text: "Local Fun at its bets!"
        },
        {
            title: "Must Go",
            image: "https://picsum.photos/150/200",
            text: "small and Local fun"
        },
        {
            title: "great for a weekend",
            image: "https://picsum.photos/150/200",
            text: "Great fun and close to home!"
        },
        {
            title: "Amazing",
            image: "https://picsum.photos/150/200",
            text: "It was an amazing trip"
        },
        {
            title: "Super Fun!",
            image: "https://picsum.photos/150/200",
            text: "Local Fun at its bets!"
        },
        {
            title: "Must Go",
            image: "https://picsum.photos/150/200",
            text: "small and Local fun"
        },
        {
            title: "great for a weekend",
            image: "https://picsum.photos/150/200",
            text: "Great fun and close to home!"
        },
    ]


    return (
        <div>
            <Grid container>
                <Grid className={classes.cardRow} container item md={12} spacing={3}>
                    {userPosts.map((post) =>
                    <UserPostCard
                    title={post.title}
                    image={post.image}
                    text={post.text}
                    />
                    )}
                </Grid>

            </Grid>
        </div>
    )
}
