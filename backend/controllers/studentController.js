const Student = require("../models/Student");


// GET /api/student/profile
const getStudentProfile = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  res.status(200).json(req.user);
};

// PUT /api/student/profile
const updateStudentProfile = async (req, res) => {
  const student = await Student.findById(req.user._id);

  if (!student) return res.status(404).json({ message: "Student not found" });

  const { name, city, skills, rolePreferences } = req.body;

  if (name) student.name = name;
  if (city) student.city = city;
  if (skills) student.skills = skills;
  if (rolePreferences) student.rolePreferences = rolePreferences;

  const updated = await student.save();
  res.json(updated);
};

module.exports = {
  getStudentProfile,
  updateStudentProfile,
};
