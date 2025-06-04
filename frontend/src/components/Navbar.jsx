import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/aboutus' },
    { label: 'Events', path: '/events' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'Login', path: '/login' }
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#1E2A38', // smooth blue-gray
        color: '#fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        zIndex: 1000,
      }}
    >
      <Toolbar className="nav-container" sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
          CampusChamp
        </Typography>

        <Box sx={{ display: 'flex', gap: 3 }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? '#90CAF9' : '#FFFFFF',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  color: '#90CAF9',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
