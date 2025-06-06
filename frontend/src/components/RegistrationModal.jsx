import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from '@mui/material';

const RegistrationModal = ({ open, onClose, event }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Register for {event?.title}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1" mb={2}>
          Fill out the form to register for this event.
        </Typography>
        <TextField fullWidth label="Name" margin="normal" />
        <TextField fullWidth label="Email" type="email" margin="normal" />
        <TextField fullWidth label="College/Organization" margin="normal" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button variant="contained" color="primary" onClick={onClose}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrationModal;
