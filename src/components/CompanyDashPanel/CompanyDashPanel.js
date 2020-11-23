import { Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import DashboardIcon from '@material-ui/icons/Dashboard';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(5),
    },
}));

export default function CompanyDashPanel(props) {
    const classes = useStyles();
    const [addButton, setAddButton] = useState(false);
    const [editButton, setEditButton] = useState(false);

    function addButtonChange() {
        if (addButton) {
            return setAddButton(false)
        } else {
            return setAddButton(true)
        }
    }

    function editButtonChange() {
        if (editButton) {
            return setEditButton(false)
        } else {
            return setEditButton(true)
        }
    }

    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            xs={12}
        >

            {addButton ?
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<DashboardIcon />}
                    onClick={() => {
                        props.handlePostAdventure();
                        addButtonChange();
                    }}
                >
                    Back to Dashboard
                </Button>
                :
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<AddIcon />}
                    onClick={() => {
                        props.handlePostAdventure();
                        addButtonChange();
                    }}
                >
                    Add Adventure
                </Button>
            }

            {editButton ?
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<DashboardIcon />}
                    onClick={() => {
                        props.handleEditCompany();
                        editButtonChange();
                    }}
                >
                    Back to Dashboard
                </Button>
                :
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<EditIcon />}
                    onClick={() => {
                        props.handleEditCompany();
                        editButtonChange();
                    }}
                >
                    Edit Company Profile
            </Button>
            }


        </Grid>
    )
}
