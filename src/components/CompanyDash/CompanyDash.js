import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import CompanyAdventureCard from '../CompanyAdventureCard';

const useStyles = makeStyles( {
    heading: {
        marginRight: 'auto',
        marginLeft: 'auto'
    }
});

export default function CompanyDash() {
const classes = useStyles();

const adventureArr = [
    {
        title: "Kayaking",
        image: "https://picsum.photos/150/200",
        date: 'January 1, 2021',
        text: "Whitewater Kayaking Fun!"
    },
    {
        title: "Hikning",
        image: "https://picsum.photos/150/200",
        date: 'January 1, 2021',
        text: "Whitewater Hiking Fun!"
    },
    {
        title: "BeirGarten",
        image: "https://picsum.photos/150/200",
        date: 'January 1, 2021',
        text: "Brews and Nature"
    },
    {
        title: "Paddleboarding",
        image: "https://picsum.photos/150/200",
        date: 'January 1, 2021',
        text: "See the Sound!"
    },
    {
        title: "RC Car Racing",
        image: "https://picsum.photos/150/200",
        date: 'January 1, 2021',
        text: "Rally rush in miniature!"
    }
]

    return (
        <Grid container xs={12} sm={12} md={12}>
            <Typography className={classes.heading} variant='h1'>Current Adventures</Typography>
            <Grid container item spacing={3}>
                {adventureArr.map((adventure) => 
                <CompanyAdventureCard
                    title={adventure.title}
                    date={adventure.date}
                    image={adventure.image}
                    text={adventure.text}
                ></CompanyAdventureCard>
                )}

            </Grid>
        </Grid>
    )
}
