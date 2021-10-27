import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const NotFound = () => {
    return <div>
        <Typography component="h1" variant="h5">
            404 Page Not found
        </Typography>
        <Link to="/">
            Go Home
        </Link>
    </div>
};

export default NotFound;