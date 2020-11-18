import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles( {
    heading: {
        marginRight: 'auto',
        marginLeft: 'auto'
    }
});

export default function CompanyDash() {
const classes = useStyles();

    return (
        <Grid container xs={12} sm={12} md={12}>
            <Typography className={classes.heading} variant='h1'>Current Adventures</Typography>
            <Grid container item>
                {/* Company Adventures Here */}
            </Grid>
        </Grid>
    )
}
