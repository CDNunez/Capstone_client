import React from 'react';
import { Typography } from '@mui/material';
import { StyledFooter } from '../styles/mainLayoutStyles';

function Footer() {
    return (
        <StyledFooter>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 6 }}>
                {'Copyright © '}
                {new Date().getFullYear()}
            </Typography>
        </StyledFooter>
    );
}

export default Footer;