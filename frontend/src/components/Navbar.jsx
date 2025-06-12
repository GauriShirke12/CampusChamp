import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // ✅ import auth
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ✅ useAuth context

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/aboutus' },
    { label: 'Events', path: '/events' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Leaderboard', path: '/leaderboard' },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#1E2A38',
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

          {user ? (
            <Button
              onClick={handleLogout}
              sx={{
                color: '#FFFFFF',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  color: '#F44336',
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: location.pathname === '/login' ? '#90CAF9' : '#FFFFFF',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    color: '#90CAF9',
                  },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{
                  color: location.pathname === '/register' ? '#90CAF9' : '#FFFFFF',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    color: '#90CAF9',
                  },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
