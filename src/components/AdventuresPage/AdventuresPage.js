import { Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import AdventureCard from '../AdventureCard'
import { makeStyles } from '@material-ui/styles'
import SearchForm from '../SearchForm/SearchForm'
import API from "../../utils/API";


const useStyles = makeStyles({
    cardRow: {
        margin: 0,
    },
});

export default function AdventuresPage(props) {
    const classes = useStyles();
    const [searchResults, setSearchResults] = useState('');
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        getDbAdventureTags();
    }, []);

    const getDbAdventureTags = () => {
        const token = localStorage.getItem("JWT");
        API.getAdventureTags(token).then(response => {
            const data = response.data
            console.log("constant:data", data)
            setOriginalData(data);
            setFilteredData(data);
        })
    }


    const handleInputChange = event => {

        setSearchResults(event);
        if (!searchResults) {
            const newList = originalData.filter(adventures => {

                if (adventures.Tags.length > 0) {

                    for (let i = 0; i < adventures.Tags.length; i++) {

                        if (adventures.Tags[i].name.indexOf(searchResults) > -1) {
                            return true
                        }
                    }
                }

            })
            setFilteredData(newList)
        }
        else {
           
            setFilteredData(originalData)
        }
    }


    return (
        <div className={classes.root} >
            <Grid container spacing={3} alignItems={'center'} justify={'center'}>
                <Grid container item justify={'center'} direction='column' md={6}>
                    <Grid container item justify={'center'}>
                    <Typography variant='h6' gutterBottom={true} justify={'center'}>Ready to start a local adventure?</Typography>
                    </Grid>

                <SearchForm  handleInputChange={handleInputChange} search={searchResults} />
                </Grid>

                <Grid className={classes.cardRow} container item md={12} spacing={3}>
                    {filteredData.map(
                        card => <AdventureCard id={card.id} title={card.name} image={card.image} text={card.Tags.name} description={card.description} xs={12} sm={6} md={6}></AdventureCard>
                    )}
                </Grid>
            </Grid>
        </div>
    )
}
