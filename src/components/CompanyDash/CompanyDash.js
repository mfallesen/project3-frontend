import { Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import CompanyAdventureCard from '../CompanyAdventureCard';
import CompanyDashPanel from '../CompanyDashPanel';
import PostAdventure from '../PostAdventure';
import CompanyAddInfo from '../CompanyAddInfo';
import { useParams } from 'react-router-dom';
import API from '../../utils/API';


const useStyles = makeStyles({
    heading: {
        marginRight: 'auto',
        marginLeft: 'auto'
    }
});

export default function CompanyDash(props) {
    const classes = useStyles();
    const [postAdventure, setPostAdventure] = useState(false);
    const [editCompany, setEditCompany] = useState(false);
    

    let { companyusername } = useParams();
    //If there is no "companyusername", we'll programmatically redirect the user to login
    const token = localStorage.getItem("JWTCOMPANY");

    //use useEffect to take token from localstorage and make a get req to backend to retrieve company info based on jwtcompany
    useEffect(() => {
        API.getCompanyProfile(companyusername, token).then(({data}) => {
            props.handleCompanyData(data);
        })
    },[])
    function handlePostAdventure() {
        if (postAdventure) {
            return setPostAdventure(false)
        } else {
            setEditCompany(false)
            return setPostAdventure(true)
        }
    }

    function handleEditCompany() {
        if (editCompany) {
            return setEditCompany(false)
        } else {
            setPostAdventure(false)
            return setEditCompany(true)
        }
    }


    const adventureArr = [
        {
            title: "Kayaking",
            image: "https://picsum.photos/150/200",
            date: 'January 1, 2021',
            text: "Whitewater Kayaking Fun!"
        },
        {
            title: "Hiking",
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
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center" >
                <Typography className={classes.heading} variant='h1'>Company name Here! </Typography>
                <CompanyDashPanel handlePostAdventure={handlePostAdventure} handleEditCompany={handleEditCompany}></CompanyDashPanel>
            </Grid>

            {postAdventure ?
                <PostAdventure /> :
                (editCompany) ?
                    <CompanyAddInfo /> :
                    <Grid container>

                        <Typography className={classes.heading} variant='h3'>Current Active Adventures</Typography>
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
            }
        </Grid>
    )
}


