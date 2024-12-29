
import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Chip } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const AppHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const auth = false; // Replace with actual authentication logic

  return (
    <AppBar position="absolute" color="primary">
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
        )}
        <Box flexGrow={1} textAlign="center">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant={isMobile ? 'h5' : 'h4'}>Havířovská Bridžová Akademie</Typography>
          </Link>
        </Box>
        {!auth && (
          <Box display="flex" gap={2}>
            <Chip label="Registrace" component={Link} to="/register" clickable />
            <Chip label="Přihlášení" component={Link} to="/login" clickable />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;