const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getMyTeam } = require("../controllers/teamController");

const router = express.Router();

router.get("/my-team", protect, getMyTeam);

module.exports = router;
