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

        <Grid container spacing={1} alignItems={'center'}>
            <Grid className={classes.cardRow} container item md={12} spacing={3}>
                <AdventureCard></AdventureCard>
                <AdventureCard></AdventureCard>
                <AdventureCard></AdventureCard>
                <AdventureCard></AdventureCard>
            </Grid>

        </Grid>
        </div>
    )
}
