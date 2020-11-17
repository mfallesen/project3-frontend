import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import './Hero.css'
import Overlay from '../Overlay';

const useStyles = makeStyles({
    btn: {
        background: '#687864',
        color: 'white',
    }
})

export default function Hero() {
    const classes = useStyles();

    return (

        <section>
            <Overlay btn={classes.btn} />
        </section>
    )
}
