const express = require("express");
const Student = require("../models/Student");
const adminOnly = require("../middlewares/adminMiddleware");

const router = express.Router();

// GET all users
router.get("/users", adminOnly, async (req, res) => {
  const users = await Student.find().select("-password");
  res.json(users);
});

// DELETE user by ID
router.delete("/users/:id", adminOnly, async (req, res) => {
  const user = await Student.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.remove();
  res.json({ message: "User deleted successfully" });
});


const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventRegistrations
} = require("../controllers/adminEventController");

router.get("/events", protect, adminOnly, getAllEvents);
router.post("/events", protect, adminOnly, createEvent);
router.put("/events/:id", protect, adminOnly, updateEvent);
router.delete("/events/:id", protect, adminOnly, deleteEvent);
router.get("/events/:id/registrations", protect, adminOnly, getEventRegistrations);

module.exports = router;
