const express = require("express");
const {
  getStudentProfile,
  updateStudentProfile,
  getRecommendedTeammates,
  updateSkillsAndRoles,
} = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getStudentProfile);
router.put("/profile", protect, updateStudentProfile);
router.get("/match-teammates", protect, getRecommendedTeammates);
router.put("/:id", protect, updateSkillsAndRoles); 

module.exports = router;
