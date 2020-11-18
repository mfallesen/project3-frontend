import React from 'react'
import Grid from '@material-ui/core/Grid'
import AdventureCard from '../AdventureCard'
import { makeStyles } from '@material-ui/styles'



const useStyles = makeStyles( {
    root: {
        flexGrow: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    cardRow: {
        margin: 0,
    },
});


export default function AdventureLanding() {
    const classes = useStyles();

    return (
        <div className={classes.root} >

        <Grid container spacing={3} alignItems={'center'}>
            <Grid className={classes.cardRow} container item md={12} spacing={3}>
                <AdventureCard title="Moving" image="https://picsum.photos/150/200" text="Im a PlaceHolder!" xs={12} sm={6} md={6}></AdventureCard>
                <AdventureCard title="Moving" image="https://picsum.photos/150/200" text="Im a PlaceHolder!" xs={12} sm={6} md={6}></AdventureCard>
                <AdventureCard title="Moving" image="https://picsum.photos/150/200" text="Im a PlaceHolder!" xs={12} sm={6} md={6}></AdventureCard>
                <AdventureCard title="Moving" image="https://picsum.photos/150/200" text="Im a PlaceHolder!" xs={12} sm={6} md={6}></AdventureCard>
            </Grid>

        </Grid>
        </div>
    )
}
