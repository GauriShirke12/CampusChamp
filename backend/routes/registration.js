const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");

// @route   POST /api/register
// @desc    Register for an event
// @access  Public
router.post("/", async (req, res) => {
  const { name, email, eventTitle } = req.body;

  if (!name || !email || !eventTitle) {
    return res.status(400).json({ msg: "Please fill all fields." });
  }

  try {
    const registration = new Registration({ name, email, eventTitle });
    await registration.save();
    res.status(201).json({ msg: "Registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
