import React, { useState, useEffect, useMemo } from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router';
import AppHeader from './AppHeader';
import NavigationDrawer from './NavigationDrawer';
import Footer from './Footer';

const MainLayout = () => {
  const [articlesByYear, setArticlesByYear] = useState(new Map());

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setArticlesByYear(new Map([[2023, []], [2022, []]])); // Mocked data fetch
      } catch (error) {
        console.error(error);
      }
    };

    loadArticles();
  }, []);

  return (
    <Box>
      <AppHeader />
      <NavigationDrawer  />
      <Box component="main" mt={8} p={3}>
        <Container>
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;

