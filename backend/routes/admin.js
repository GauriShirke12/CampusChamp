const express = require("express");
const { getAllStudents, deleteStudent, getAllEvents } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/students", protect, getAllStudents);
router.delete("/students/:id", protect, deleteStudent);
router.get("/events", protect, getAllEvents);

module.exports = router;
