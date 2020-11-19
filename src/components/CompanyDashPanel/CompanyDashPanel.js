import { Grid } from '@material-ui/core'
import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(5),
    },
}));

export default function CompanyDashPanel(props) {
    const classes = useStyles();


    return (
        <Grid 
            container
            direction="row"
            justify="space-evenly"
            alignItems="center" 
            xs={12}
        >
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<AddIcon />}
                onClick={props.handlePostAdventure}
            >
                Add Adventure
            </Button>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<EditIcon />}
                onClick={props.handleEditCompany}
            >
                Edit Company Profile
            </Button>
        </Grid>
    )
}
