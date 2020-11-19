import { Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import AdventureCard from '../AdventureCard'
import { makeStyles } from '@material-ui/styles'
import SearchForm from '../SearchForm/SearchForm'
import API from "../../utils/API"

const useStyles = makeStyles({
    cardRow: {
        margin: 0,
    },
});

export default function AdventuresPage(props) {
    const classes = useStyles();
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        getDbAdventureTags();
    }, []);

    const getDbAdventureTags = () => {
        const token = localStorage.getItem("JWT");
        API.getAdventureTags(token).then(response => {
            const data = response.data
            console.log("constant:data", data)
            setSearchResults(data);
        })
    }

    return (
        <div className={classes.root} >
            <Grid container spacing={3} alignItems={'center'}>
            <SearchForm handleInputChange={props.handleInputChange} search={props.search} />
                <Grid className={classes.cardRow} container item md={12} spacing={3}>
                    {adventure.map(
                        card => <AdventureCard title={card.name} image={card.image} text={card.Tags.name} description={card.description} xs={12} sm={6} md={6}></AdventureCard>
                    )}
                </Grid>
            </Grid>
        </div>
    )
}
    

    // const adventureArr = [
    //     {
    //         title: "Kayaking",
    //         image: "https://picsum.photos/150/200",
    //         text: "Whitewater Kayaking Fun!"
    //     },
    //     {
    //         title: "Hiking",
    //         image: "https://picsum.photos/150/200",
    //         text: "Whitewater Hiking Fun!"
    //     },
    //     {
    //         title: "BeirGarten",
    //         image: "https://picsum.photos/150/200",
    //         text: "Brews and Nature"
    //     },
    //     {
    //         title: "Paddleboarding",
    //         image: "https://picsum.photos/150/200",
    //         text: "See the Sound!"
    //     },
    //     {
    //         title: "RC Car Racing",
    //         image: "https://picsum.photos/150/200",
    //         text: "Rally rush in miniature!"
    //     }
    // ]


    // filterAdventures = (value) => {
    //     let filterAdventures = searchResults.tag.filter((tag) => {
    //         if (
    //             tag.name.toLowerCase().includes(value.toLowerCase)
    //         ) {
    //             return tag;
    //         }
    //     });
    //     return useState({
    //         filteredAdventures: filterAdventures,
    //         search: ""
    //     });
    // };


    // return (

    //     <Grid container>
    //         <SearchForm handleInputChange={props.handleInputChange} search={props.search} />
    //         <Grid className={classes.cardRow} container item spacing={3} md={12} alignItems={'center'}>

    //             {adventureArr.map((adventure) =>
    //                 <AdventureCard
    //                     title={adventure.title}
    //                     image={adventure.image}
    //                     text={adventure.text}
    //                     sm={6}
    //                     xs={12}
    //                     md={4}
    //                 ></AdventureCard>
    //             )}

    //         </Grid>
    //     </Grid>
    // )

