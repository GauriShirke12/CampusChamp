// server/routes/register.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define schema
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  eventTitle: String,
  date: { type: Date, default: Date.now }
});

// Create model
const Registration = mongoose.model('Registration', registrationSchema);

// POST /api/register
router.post('/', async (req, res) => {
  const { name, email, eventTitle } = req.body;

  if (!name || !email || !eventTitle) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const newEntry = new Registration({ name, email, eventTitle });
    await newEntry.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;
