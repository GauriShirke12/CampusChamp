import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container, Typography, Button, Table, TableHead, TableRow, TableCell,
  TableBody, IconButton, Dialog, TextField, DialogActions, DialogTitle,
  DialogContent, CircularProgress, Alert
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

const EventManagement = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", date: "", location: "" });
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/events", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setEvents(res.data);
    } catch (err) {
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  const openForm = (event = null) => {
    if (event) {
      setEditingId(event._id);
      setForm({
        title: event.title,
        description: event.description,
        date: event.date?.split("T")[0] || "",
        location: event.location,
      });
    } else {
      setEditingId(null);
      setForm({ title: "", description: "", date: "", location: "" });
    }
    setOpen(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const { title, description, date, location } = form;
    if (!title || !description || !date || !location) {
      alert("All fields are required.");
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      if (editingId) {
        await axios.put(`/api/admin/events/${editingId}`, form, config);
      } else {
        await axios.post("/api/admin/events", form, config);
      }
      await fetchEvents();
      setOpen(false);
    } catch (err) {
      alert("Failed to save the event.");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this event?");
    if (!confirm) return;

    try {
      await axios.delete(`/api/admin/events/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      await fetchEvents();
    } catch (err) {
      alert("Failed to delete the event.");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Event Management</Typography>
      <Button variant="contained" onClick={() => openForm()} sx={{ mb: 2 }}>
        Create Event
      </Button>

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
                <IconButton onClick={() => openForm(event)}><Edit /></IconButton>
                <IconButton onClick={() => handleDelete(event._id)}><Delete color="error" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{editingId ? "Edit Event" : "Create Event"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="dense"
            value={form.title}
            onChange={handleFormChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="dense"
            value={form.description}
            onChange={handleFormChange}
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            fullWidth
            margin="dense"
            value={form.date}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Location"
            name="location"
            fullWidth
            margin="dense"
            value={form.location}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventManagement;
