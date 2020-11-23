import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid'
import AdventureCard from '../AdventureCard'
import { makeStyles } from '@material-ui/styles'
import API from "../../utils/API";

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

    useEffect(() => {
        getDbAdventures();
    }, []);

    const getDbAdventures = () => {
        

        API.getAdventureLanding().then(response => {
            const data = response.data
            var newItems = [];

            if (data.length <= 3) {
                for (var i = 0; i < data.length; i++) {
                    var idx = Math.floor(Math.random() * data.length);
                    newItems.push(data[idx]);
                    data.splice(idx, 1);
                }
                setAdventure(newItems);
            } else if (data.length > 4) {
                for (var i = 0; i < 4; i++) {
                    var idx = Math.floor(Math.random() * data.length);
                    newItems.push(data[idx]);
                    data.splice(idx, 1);
                }
                setAdventure(newItems);
            }
        })
    }

    return (
        <div className={classes.root} >

            <Grid container spacing={3} alignItems={'center'}>
                <Grid className={classes.cardRow} container item md={12} spacing={3}>
                    {adventure.map(
                        card => <AdventureCard id={card.id} title={card.name} image={card.image} text={card.Tags.name} description={card.description} lat={card.latitude} lon={card.longitude} website={card.Adventure_company.website} xs={12} sm={6} md={6}></AdventureCard>
                    )}
                </Grid>
            </Grid>
        </div>
    )
}
