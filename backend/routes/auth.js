const express = require("express");
const { registerStudent, loginStudent } = require("../controllers/authController");

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerStudent);

// POST /api/auth/login
router.post("/login", loginStudent);

module.exports = router;
