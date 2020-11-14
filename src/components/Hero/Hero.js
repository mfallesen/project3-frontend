import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import './Hero.css'

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
           <h1>Memorable Microadventures</h1>
           <Button className={classes.btn}>Sign Up</Button>
       </section>
    )
}
