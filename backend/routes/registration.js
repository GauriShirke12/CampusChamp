// backend/routes/registration.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Schema for registration
const RegistrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  collegeOrOrganization: String,
  eventTitle: String,
});

const Registration = mongoose.model("Registration", RegistrationSchema);

// POST /api/register
router.post("/", async (req, res) => {
  try {
    console.log("Received data:", req.body); // For debug

    const { name, email, collegeOrOrganization, eventTitle } = req.body;

    if (!name || !email || !collegeOrOrganization || !eventTitle) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRegistration = new Registration({
      name,
      email,
      collegeOrOrganization,
      eventTitle,
    });

    await newRegistration.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
