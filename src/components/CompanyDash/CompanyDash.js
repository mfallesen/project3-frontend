import { Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import CompanyAdventureCard from '../CompanyAdventureCard';
import CompanyDashPanel from '../CompanyDashPanel';
import PostAdventure from '../PostAdventure';
import CompanyEditInfo from '../CompanyEditInfo';
import { useParams, useHistory } from 'react-router-dom';
import API from '../../utils/API';
import moment from 'moment';

const useStyles = makeStyles({
    heading: {
        marginRight: 'auto',
        marginLeft: 'auto'
    }
});

export default function CompanyDash(props) {
    const classes = useStyles();
    const history = useHistory();
    const [postAdventureState, setPostAdventureState] = useState(false);
    const [editCompanyState, setEditCompanyState] = useState(false);
    const [adventureState, setAdventureState] = useState([]);

    let { companyname } = useParams();
    //If there is no "companyname", we'll programmatically redirect the user to login
    if (!companyname) {
        history.push('/companylogin')
    }

    //use useEffect to take token from localstorage and make a get req to backend to retrieve company info based on jwtcompany
    useEffect(() => {
        const token = localStorage.getItem("JWTCOMPANY");
        const companyUserName = localStorage.getItem("USERNAMECOMPANY")
        API.getCompanyProfile(companyUserName, token).then(({ data }) => {
            props.handleCompanyData(data);
        }).catch(err => console.error(err))
        setTimeout(() => {
            getDbAdventures()
        }, 1000)
    }, [props.companyProfile.Adventure_company.id])

    const handlePostAdventure = () => {
        if (postAdventureState) {
            return setPostAdventureState(false)
        } else {
            setEditCompanyState(false)
            return setPostAdventureState(true)
        }
    }

    const handleEditCompany = () => {
        if (editCompanyState) {
            return setEditCompanyState(false)
        } else {
            setPostAdventureState(false)
            return setEditCompanyState(true)
        }
    }

    const getDbAdventures = () => {
        const token = localStorage.getItem("JWTCOMPANY");
        API.getAdventures(token).then(res => {
            const newList = res.data.filter(adventure => {
                return adventure.AdventureCompanyId === props.companyProfile.Adventure_company.id
            })
            setAdventureState(newList);
        })
    }

    const adventureCardDelete = (num) => {
        const token = localStorage.getItem('JWTCOMPANY')
        API.deleteAdventure(num, token).then(res => {
            getDbAdventures();
        }).catch(err => {
            console.error(err);
        })
    }

    return (
        <Grid container xs={12} sm={12} md={12}>

            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center" >
                <Typography className={classes.heading} variant='h1'>{props.companyProfile.Adventure_company.name}</Typography>
                <CompanyDashPanel handlePostAdventure={handlePostAdventure} handleEditCompany={handleEditCompany}></CompanyDashPanel>
            </Grid>

            {postAdventureState ?
                <PostAdventure companyProfile={props.companyProfile} /> :
                (editCompanyState) ?
                    <CompanyEditInfo companyProfile={props.companyProfile} setCompanyData={props.setCompanyData} handleEditCompany={handleEditCompany} /> :
                    <Grid container>

                        <Typography className={classes.heading} variant='h3'>Current Active Adventures</Typography>
                        <Grid container item spacing={3}>
                            {adventureState.map((adventure) =>

                                <CompanyAdventureCard
                                    title={adventure.name}
                                    date={moment(adventure.createdAt).format('D MMM YYYY')}
                                    image={adventure.image}
                                    text={adventure.description}
                                    adventure={adventure.id}
                                    lat={adventure.latitude}
                                    lon={adventure.longitude}
                                    website={adventure.Adventure_company.website}
                                    deleteCard={adventureCardDelete}
                                ></CompanyAdventureCard>
                            )}
                        </Grid>
                    </Grid>
            }
        </Grid>
    )
}