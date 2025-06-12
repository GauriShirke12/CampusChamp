const Student = require("../models/Student");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register Student
exports.registerStudent = async (req, res) => {
  const { name, collegeId, collegeName, city, email, password } = req.body;

  if (!name || !collegeId || !collegeName || !city || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingStudent = await Student.findOne({ email });
  if (existingStudent) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const student = await Student.create({
    name,
    collegeId,
    collegeName,
    city,
    email,
    password,
    role: "student", // Default role
  });

  res.status(201).json({
    user: {
      _id: student._id,
      name: student.name,
      email: student.email,
      collegeId: student.collegeId,
      collegeName: student.collegeName,
      city: student.city,
      role: student.role,
    },
    token: generateToken(student._id),
  });
};

// Login Student
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });
  if (!student || !(await student.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    user: {
      _id: student._id,
      name: student.name,
      email: student.email,
      collegeId: student.collegeId,
      collegeName: student.collegeName,
      city: student.city,
      role: student.role,
    },
    token: generateToken(student._id),
  });
};
