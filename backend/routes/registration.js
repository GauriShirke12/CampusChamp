const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");

// POST /api/register
router.post("/", async (req, res) => {
  try {
    const { name, email, collegeOrOrganization, eventTitle } = req.body;

    if (!name || !email || !collegeOrOrganization || !eventTitle) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Registration.findOne({ email, eventTitle });
    if (existing) {
      return res.status(200).json({ message: "You're already registered for this event." });
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
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
