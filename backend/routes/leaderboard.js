const express = require("express");
const router = express.Router();
const { getDSALeaderboard } = require("../controllers/leaderboardController");

router.get("/", getDSALeaderboard);

module.exports = router;
