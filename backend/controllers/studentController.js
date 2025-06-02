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

// GET /api/student/recommend
const getRecommendedTeammates = async (req, res) => {
  try {
    const currentStudent = req.user;

    // Get all other students except current
    const otherStudents = await Student.find({ _id: { $ne: currentStudent._id } });

    const recommendations = otherStudents.map(student => {
      // Skills current student does NOT have, but this student does
      const complementarySkills = student.skills.filter(skill => !currentStudent.skills.includes(skill));

      // Role preferences current student does NOT have, but this student does
      const complementaryRoles = student.rolePreferences.filter(role => !currentStudent.rolePreferences.includes(role));

      // Simple score based on complementary skills + roles
      const score = complementarySkills.length + complementaryRoles.length;

      return {
        _id: student._id,
        name: student.name,
        collegeName: student.collegeName,
        city: student.city,
        skills: student.skills,
        rolePreferences: student.rolePreferences,
        score,
      };
    });

    // Sort descending by score
    recommendations.sort((a, b) => b.score - a.score);

    // Return top 5 recommendations
    res.status(200).json(recommendations.slice(0, 5));
  } catch (error) {
    res.status(500).json({ message: "Failed to get teammate recommendations", error: error.message });
  }
};

module.exports = {
  getStudentProfile,
  updateStudentProfile,
  getRecommendedTeammates,
};
