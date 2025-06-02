const express = require("express");
const {
  getStudentProfile,
  updateStudentProfile,
  getRecommendedTeammates,
} = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected routes
router.get("/profile", protect, getStudentProfile);
router.put("/profile", protect, updateStudentProfile);
router.get("/recommend", protect, getRecommendedTeammates); 

module.exports = router;
