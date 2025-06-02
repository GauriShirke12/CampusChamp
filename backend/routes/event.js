const express = require("express");
const router = express.Router();
const { createEvent, rsvpEvent, getEvents, getLeaderboard } = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createEvent);
router.post("/rsvp/:eventId", protect, rsvpEvent);
router.get("/", getEvents);
router.get("/leaderboard", getLeaderboard);


module.exports = router;
