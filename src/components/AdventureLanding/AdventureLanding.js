import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid'
import AdventureCard from '../AdventureCard'
import { makeStyles } from '@material-ui/styles'
import API from "../../utils/API";


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    cardRow: {
        margin: 0,
    },
});


export default function AdventureLanding(props) {
    const classes = useStyles();
    const [adventure, setAdventure] = useState([]);

    useEffect(() => {
        getDbAdventures();
    }, []);

    const getDbAdventures = () => {
        

        API.getAdventureLanding().then(response => {
            const data = response.data
            console.log("constant:data", data)
            var newItems = [];

            for (var i = 0; i < 4; i++) {
                var idx = Math.floor(Math.random() * data.length);
                newItems.push(data[idx]);
                data.splice(idx, 1);
            }
            setAdventure(newItems);
        })
    }

    return (
        <div className={classes.root} >

            <Grid container spacing={3} alignItems={'center'}>
                <Grid className={classes.cardRow} container item md={12} spacing={3}>
                    {adventure.map(
                        card => <AdventureCard title={card.name} image={card.image} text={card.Tags.name} description={card.description} xs={12} sm={6} md={6}></AdventureCard>
                    )}


                </Grid>

            </Grid>
        </div>
    )
}
