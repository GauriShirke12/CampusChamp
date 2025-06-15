const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createTeam,
  joinTeam,
  getTeamByEvent,
  getMyTeam
} = require("../controllers/teamController");

router.post("/create", protect, createTeam);
router.post("/join", protect, joinTeam);
router.get("/my/:eventId", protect, getMyTeam);
router.get("/event/:eventId", protect, getTeamByEvent);

module.exports = router;
