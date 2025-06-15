const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Correctly import named export `protect`
const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

/* ----------------------- USER MANAGEMENT ----------------------- */
router.get("/users", adminOnly, async (req, res) => {
  const users = await Student.find().select("-password");
  res.json(users);
});

router.delete("/users/:id", adminOnly, async (req, res) => {
  const user = await Student.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.remove();
  res.json({ message: "User deleted successfully" });
});

/* ----------------------- EVENT MANAGEMENT ----------------------- */
const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventRegistrations,
} = require("../controllers/adminEventController");

router.get("/events", protect, adminOnly, getAllEvents);
router.post("/events", protect, adminOnly, createEvent);
router.put("/events/:id", protect, adminOnly, updateEvent);
router.delete("/events/:id", protect, adminOnly, deleteEvent);
router.get("/events/:id/registrations", protect, adminOnly, getEventRegistrations);

/* ------------------ LEADERBOARD CONTROL ------------------ */
const {
  getLeaderboard,
  updateStudentScores,
} = require("../controllers/adminLeaderboardController");

router.get("/leaderboard", protect, adminOnly, getLeaderboard);
router.put("/leaderboard/:id", protect, adminOnly, updateStudentScores);

/* ------------------ DASHBOARD INSIGHTS ------------------ */
const {
  getDashboardStats,
} = require("../controllers/adminDashboardController");

router.get("/dashboard-stats", protect, adminOnly, getDashboardStats);

/* ------------------ CONTENT MODERATION ------------------ */
const {
  getAllWorkshops,
  updateWorkshopApproval,
} = require("../controllers/adminContentController");

router.get("/workshops", protect, adminOnly, getAllWorkshops);
router.put("/workshops/:id/approve", protect, adminOnly, updateWorkshopApproval);

module.exports = router;
