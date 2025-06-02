const express = require("express");
const router = express.Router();
const { createEvent } = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createEvent);

module.exports = router;
