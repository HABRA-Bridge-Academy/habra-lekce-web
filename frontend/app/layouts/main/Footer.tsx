import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => (
  <Box component="footer" textAlign="center" py={2} bgcolor="grey.100">
    <Typography variant="body2" color="textSecondary">
      &copy; {new Date().getFullYear()} Bridžový Spolek Havířov
    </Typography>
    <Link to="/podminky-ochrany-osobnich-udaju">Podmínky ochrany osobních údajů</Link>
  </Box>
);

export default Footer;
