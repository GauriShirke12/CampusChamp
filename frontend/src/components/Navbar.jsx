import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/aboutus' },
    { label: 'Events', path: '/events' },
    { label: 'Leaderboard', path: '/leaderboard' },
  ];

  const isAdmin = user?.role === 'admin';

  return (
    <AppBar position="sticky" className="navbar">
      <Toolbar className="nav-container">
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          CampusChamp
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? '#90CAF9' : '#FFFFFF',
                fontWeight: 500,
              }}
            >
              {item.label}
            </Button>
          ))}

          {user && !isAdmin && (
            <Button component={Link} to="/dashboard" sx={{ color: '#FFFFFF' }}>
              Dashboard
            </Button>
          )}

          {isAdmin && (
            <Button component={Link} to="/admin" sx={{ color: '#FFD54F' }}>
              Admin Panel
            </Button>
          )}

          {user ? (
            <Button onClick={handleLogout} sx={{ color: '#F44336' }}>
              Logout
            </Button>
          ) : (
            <>
              <Button component={Link} to="/login" sx={{ color: '#FFFFFF' }}>
                Login
              </Button>
              <Button component={Link} to="/register" sx={{ color: '#FFFFFF' }}>
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
