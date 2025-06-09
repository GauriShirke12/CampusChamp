const Student = require("../models/Student");
const Event = require("../models/Event"); // Required for event RSVPs

// GET /api/student/profile
exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      name: student.name,
      email: student.email,
      collegeName: student.collegeName,
      city: student.city,
      dsaScore: student.dsaScore,
      dsaRank: student.dsaRank,
      quizScore: student.quizScore,
      workshops: student.workshops,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
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

// PUT /api/student/:id
const updateSkillsAndRoles = async (req, res) => {
  try {
    const { skills, rolePreferences } = req.body;
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { skills, rolePreferences },
      { new: true }
    );
    res.json({ message: "Student profile updated", student: updated });
  } catch (err) {
    console.error("Update student error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/student/match-teammates?eventId=EVENT_ID
const getRecommendedTeammates = async (req, res) => {
  try {
    const currentStudentId = req.user._id;
    const { eventId } = req.query;

    if (!eventId) return res.status(400).json({ message: "eventId is required" });

    const currentStudent = await Student.findById(currentStudentId);
    const event = await Event.findById(eventId);

    if (!event || !event.rsvps || event.rsvps.length === 0) {
      return res.status(404).json({ message: "No RSVPs for this event" });
    }

    const otherStudentIds = event.rsvps.filter(id => id.toString() !== currentStudentId.toString());
    const otherStudents = await Student.find({ _id: { $in: otherStudentIds } });

    const recommendations = otherStudents.map(student => {
      const complementarySkills = student.skills.filter(skill => !currentStudent.skills.includes(skill));
      const complementaryRoles = student.rolePreferences.filter(role => !currentStudent.rolePreferences.includes(role));
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

    recommendations.sort((a, b) => b.score - a.score);
    res.status(200).json(recommendations.slice(0, 5));
  } catch (error) {
    console.error("Matching error:", error.message);
    res.status(500).json({ message: "Failed to get teammate recommendations", error: error.message });
  }
};

module.exports = {
  getStudentProfile,
  updateStudentProfile,
  updateSkillsAndRoles,
  getRecommendedTeammates,
};
