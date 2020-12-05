import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid'
import AdventureCard from '../AdventureCard'
import { makeStyles } from '@material-ui/styles'
import API from "../../utils/API";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import theme from '../../theme'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    cardRow: {
        margin: 0,
    },
}));

export default function AdventureLanding(props) {
    const classes = useStyles();
    const [adventure, setAdventure] = useState([]);
    const mediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    useEffect(() => {
        getDbAdventures();
    }, [mediumScreen, largeScreen]);

    const getDbAdventures = () => {


        API.getAdventureLanding().then(response => {
            const data = response.data
            var newItems = [];
            console.log(data);
            if (data.length <= 3) {
                for (let i = 0; i < data.length; i++) {
                    let idx = Math.floor(Math.random() * data.length);
                    newItems.push(data[idx]);
                    data.splice(idx, 1);
                }
                setAdventure(newItems);
            } else if (mediumScreen && !largeScreen) {
                for (let i = 0; i < 3; i++) {
                    let idx = Math.floor(Math.random() * data.length);
                    newItems.push(data[idx]);
                    data.splice(idx, 1);
                }
                setAdventure(newItems);
            } else if (largeScreen) {
                for (let i = 0; i < 4; i++) {
                    let idx = Math.floor(Math.random() * data.length);
                    newItems.push(data[idx]);
                    data.splice(idx, 1);
                }
                setAdventure(newItems);
            }
        })
    }

    return (
            <Grid container spacing={3} className={classes.root} >
                <Grid className={classes.cardRow} container item md={12} spacing={3}>
                    {adventure.map(
                        card => <AdventureCard id={card.id} title={card.name} image={card.image} text={card.Tags.name} description={card.description} lat={card.latitude} lon={card.longitude} website={card.Adventure_company.website} rating={card.Adventure_ratings.length} xs={12} sm={6} md={4} lg={3}></AdventureCard>
                    )}
                </Grid>
            </Grid>
    )
}
