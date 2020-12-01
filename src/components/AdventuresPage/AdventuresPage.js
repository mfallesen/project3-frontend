import { Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import AdventureCard from '../AdventureCard'
import SearchForm from '../SearchForm/SearchForm'
import API from "../../utils/API";
import { makeStyles } from '@material-ui/styles'
import Fuse from 'fuse.js'

const useStyles = makeStyles({
    pageTitle: {
        marginTop: 30
    },
})

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
            setOriginalData(data);
            setFilteredData(data);
            return data
        })
    }

    const fuseOptions = {
        isCaseSensitive: false,
        keys: [
            {
                name: 'name',
                weight: 2
            },
            {
                name: 'description',
                weight: 2,
            },
            {
                name: 'Tags.name',
                weight: 3
            }
        ]
    };

    const fuse = new Fuse(originalData, fuseOptions);

    const handleInputChange = event => {

        setSearchResults(event);

        const fuseSearch = fuse.search(searchResults);
        if (fuseSearch.length > 0) {
            let newFuseSearch = []
            for (let i = 0; i < fuseSearch.length; i++) {
                const result = fuseSearch[i];
                newFuseSearch.push(result.item)
            }
            setFilteredData(newFuseSearch)
        } else {
            setFilteredData(originalData)
        }
    }

    return (

        <Grid container spacing={4} alignItems={'center'} justify={'center'} md={12}>
            <Grid container spacing={4} item justify={'center'} direction='column' md={12}>

                <Grid container item justify={'flex-end'} elevation={6}  >
                    <Grid container item justify={'center'} direction='column' alignItems='center'>
                        <Typography className={classes.pageTitle} variant='h4' gutterBottom={true} justify={'center'}>Explore Adventures!</Typography>
                        <Typography variant='body1'></Typography>
                    </Grid>
                    <Grid container item direction='column' md={4}>
                        <Typography variant='caption'> Trying to find something specfic?</Typography>
                        <SearchForm handleInputChange={handleInputChange} search={searchResults} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item md={12} spacing={3}>
                {filteredData.map(
                    card => <AdventureCard id={card.id} title={card.name} image={card.image} text={card.Tags.name} description={card.description} lat={card.latitude} lon={card.longitude} website={card.Adventure_company.website} xs={12} sm={6} md={4}></AdventureCard>
                )}
            </Grid>

        </Grid>

    )
}
