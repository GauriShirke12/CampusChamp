import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container, Typography, Button, Table, TableHead, TableRow, TableCell,
  TableBody, IconButton, Dialog, TextField, DialogActions, DialogTitle, DialogContent
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

const EventManagement = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", date: "", location: "" });

  const fetchEvents = async () => {
    const res = await axios.get("/api/admin/events", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpen = (event = null) => {
    if (event) {
      setEditing(event._id);
      setForm(event);
    } else {
      setEditing(null);
      setForm({ title: "", description: "", date: "", location: "" });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await axios.put(`/api/admin/events/${editing}`, form, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        await axios.post("/api/admin/events", form, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }
      fetchEvents();
      setOpen(false);
    } catch (err) {
      alert("Failed to save event.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this event?")) {
      await axios.delete(`/api/admin/events/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchEvents();
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Event Management</Typography>
      <Button variant="contained" onClick={() => handleOpen()}>Create Event</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event._id}>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.description}</TableCell>
              <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpen(event)}><Edit /></IconButton>
                <IconButton onClick={() => handleDelete(event._id)}><Delete color="error" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for Create/Edit */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editing ? "Edit Event" : "Create Event"}</DialogTitle>
        <DialogContent>
          <TextField label="Title" fullWidth margin="dense" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <TextField label="Description" fullWidth margin="dense" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <TextField type="date" fullWidth margin="dense" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <TextField label="Location" fullWidth margin="dense" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventManagement;
