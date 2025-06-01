const Student = require("../models/Student");
const jwt = require("jsonwebtoken");

//Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// POST /api/register
const registerStudent = async (req, res) => {
  const { collegeId, name, collegeName, city, email, password } = req.body;

  try {
    // Check if student already exists
    const existing = await Student.findOne({ collegeId });
    if (existing) {
      return res.status(400).json({ message: "Student already registered" });
    }

    const student = await Student.create({
      collegeId, name, collegeName, city, email, password,
    });

    res.status(201).json({
      _id: student._id,
      name: student.name,
      token: generateToken(student._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// POST /api/login
const loginStudent = async (req, res) => {
  const { collegeId, password } = req.body;

  try {
    const student = await Student.findOne({ collegeId });

    if (!student) {
      return res.status(400).json({ message: "Invalid college ID or password" });
    }

    const isMatch = await student.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid college ID or password" });
    }

    res.status(200).json({
      _id: student._id,
      name: student.name,
      token: generateToken(student._id),
    });

  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

module.exports = { registerStudent, loginStudent };
