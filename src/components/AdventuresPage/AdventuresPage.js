import { Grid } from '@material-ui/core'
import React from 'react'
import AdventureCard from '../AdventureCard'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles( {
    cardRow: {
        margin: 0,
    },
});



export default function AdventuresPage() {
    const classes = useStyles();

    const adventureArr = [
        {
            title: "Kayaking",
            image: "https://picsum.photos/150/200",
            text: "Whitewater Kayaking Fun!"
        },
        {
            title: "Hikning",
            image: "https://picsum.photos/150/200",
            text: "Whitewater Hiking Fun!"
        },
        {
            title: "BeirGarten",
            image: "https://picsum.photos/150/200",
            text: "Brews and Nature"
        },
        {
            title: "Paddleboarding",
            image: "https://picsum.photos/150/200",
            text: "See the Sound!"
        },
        {
            title: "RC Car Racing",
            image: "https://picsum.photos/150/200",
            text: "Rally rush in miniature!"
        }
    ]





    return (
        <Grid container>
        <Grid className={classes.cardRow} container item spacing={3} md={12} alignItems={'center'}>
        
        
        <AdventureCard></AdventureCard>
        <AdventureCard></AdventureCard>
        <AdventureCard></AdventureCard>
        <AdventureCard></AdventureCard>
      
        
        </Grid>
        </Grid>
    )
}
