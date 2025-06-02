const express = require("express");
const { getStudentProfile, updateStudentProfile } = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected routes
router.get("/profile", protect, getStudentProfile);
router.put("/profile", protect, updateStudentProfile);

module.exports = router;
