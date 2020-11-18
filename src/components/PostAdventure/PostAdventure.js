import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core'
import Typography from '../Typography';





const useStyles = makeStyles((theme) => ({

}));



export default function AdventurePost() {
    const classes = useStyles();

    return (

        <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>

    );
}