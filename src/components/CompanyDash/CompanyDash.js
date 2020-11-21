import { Grid, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import CompanyAdventureCard from '../CompanyAdventureCard';
import CompanyDashPanel from '../CompanyDashPanel';
import PostAdventure from '../PostAdventure';
import CompanyAddInfo from '../CompanyAddInfo';
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
    const [postAdventure, setPostAdventure] = useState(false);
    const [editCompany, setEditCompany] = useState(false);
    const [adventure, setAdventure] = useState([]);

    let { companyname } = useParams();
    //If there is no "companyname", we'll programmatically redirect the user to login
    if(!companyname){
        history.push('/companylogin')
    }
    const token = localStorage.getItem("JWTCOMPANY");
    console.log("Comp name and token:", companyname, token);

    //use useEffect to take token from localstorage and make a get req to backend to retrieve company info based on jwtcompany
    useEffect(() => {
        API.getCompanyProfile(companyname, token).then(({data}) => {
            props.handleCompanyData(data);
            console.log("Data from getCompanyProfile", data);
        }).catch(err => history.push('/companylogin'))
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

    useEffect(() => {
        getDbAdventures();
    }, []);

    const getDbAdventures = () => {

        const token = localStorage.getItem("JWT");

        API.getAdventures(token).then(response => {
            const data = response.data
            console.log("constant:data", data)
            
            setAdventure(data);
        })
    }

    const adventureArr = adventure;
    // [
    //     {
    //         title: "Kayaking",
    //         image: "https://picsum.photos/150/200",
    //         date: 'January 1, 2021',
    //         text: "Whitewater Kayaking Fun!"
    //     },
    //     {
    //         title: "Hikning",
    //         image: "https://picsum.photos/150/200",
    //         date: 'January 1, 2021',
    //         text: "Whitewater Hiking Fun!"
    //     },
    //     {
    //         title: "BeirGarten",
    //         image: "https://picsum.photos/150/200",
    //         date: 'January 1, 2021',
    //         text: "Brews and Nature"
    //     },
    //     {
    //         title: "Paddleboarding",
    //         image: "https://picsum.photos/150/200",
    //         date: 'January 1, 2021',
    //         text: "See the Sound!"
    //     },
    //     {
    //         title: "RC Car Racing",
    //         image: "https://picsum.photos/150/200",
    //         date: 'January 1, 2021',
    //         text: "Rally rush in miniature!"
    //     }
    // ]

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
                                    title={adventure.name}
                                    date={moment(adventure.createdAt).format('D MMM YYYY')}
                                    image={adventure.image}
                                    text={adventure.description}
                                ></CompanyAdventureCard>
                            )}
                        </Grid>
                    </Grid>
            }
        </Grid>
    )
}


