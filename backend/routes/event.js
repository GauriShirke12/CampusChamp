const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createEvent,
  rsvpEvent,
  getLeaderboard
} = require("../controllers/eventController");

// Route to create a new event
router.post("/create", protect, createEvent);

// RSVP route handled in controller
router.post("/rsvp/:eventId", protect, rsvpEvent);

// Leaderboard route
router.get("/leaderboard", protect, getLeaderboard);

module.exports = router;
