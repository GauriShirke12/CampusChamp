const express = require("express");
const router = express.Router();
const {
  createEvent,
  rsvpEvent,
  getEvents,
  getLeaderboard,
} = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");

// Event creation & RSVP
router.post("/create", protect, createEvent);
router.post("/rsvp/:eventId", protect, rsvpEvent);

// Public event data
router.get("/", getEvents);

// Event leaderboard
router.get("/leaderboard", getLeaderboard);

module.exports = router;
