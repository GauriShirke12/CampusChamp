import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from '@mui/material';

const RegistrationModal = ({ open, onClose, event }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    collegeOrOrganization: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          eventTitle: event?.title,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Registered for ${event?.title}!`);
        onClose();
        setFormData({ name: '', email: '', collegeOrOrganization: '' });
      } else {
        alert(data.msg || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Server error.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Register for {event?.title}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Fill in your details to register for this event.
        </Typography>
        <TextField
          name="name"
          label="Name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          name="collegeOrOrganization"
          label="College / Organization"
          fullWidth
          margin="normal"
          value={formData.collegeOrOrganization}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrationModal;
