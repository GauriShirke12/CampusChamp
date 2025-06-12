import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      setSuccessMsg('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Registration failed!');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        mt={10}
        p={4}
        sx={{
          backgroundColor: '#F4F6F8',
          borderRadius: 3,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1E2A38' }}>
          Create an Account
        </Typography>

        {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
        {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

        <form onSubmit={handleRegister}>
          <TextField
            name="name"
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            name="email"
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="college"
            label="College or Organization"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.college}
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, backgroundColor: '#1E2A38' }}>
            Register
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/login">Login here</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
