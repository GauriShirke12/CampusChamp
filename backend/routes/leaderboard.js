// backend/routes/leaderboard.js

const express = require("express");
const router = express.Router();
const {
  getLeaderboard,
  updateStudentScores,
} = require("../controllers/leaderboardController");

// GET top students for leaderboard
router.get("/", getLeaderboard);

// PUT to update a student's DSA score
router.put("/:id", updateStudentScores);

module.exports = router;
