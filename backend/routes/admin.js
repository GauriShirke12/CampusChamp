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

module.exports = router;
