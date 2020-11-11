import { Link } from '@material-ui/core';

import React from 'react';
import './Navbar.css'

export default function Navbar() {
    return (
        <div>
            <Link href="#" color="inherit">
            Home
            </Link>
            <Link href="#" color="inherit">
            About
            </Link>
            <Link href="#" color="inherit">
            Sign In
            </Link>
        </div>
    )
}
