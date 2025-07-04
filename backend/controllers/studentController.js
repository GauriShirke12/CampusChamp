const Student = require("../models/Student");
const Event = require("../models/Event");

// GET /api/student/profile
const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });

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
    console.error("Get student profile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/student/profile
const updateStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const { name, city, skills, rolePreferences } = req.body;
    if (name) student.name = name;
    if (city) student.city = city;
    if (Array.isArray(skills)) student.skills = skills;
    if (Array.isArray(rolePreferences)) student.rolePreferences = rolePreferences;

    const updated = await student.save();
    res.json(updated);
  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/student/:id
const updateSkillsAndRoles = async (req, res) => {
  try {
    const { skills, rolePreferences } = req.body;
    const updateFields = {};
    if (Array.isArray(skills)) updateFields.skills = skills;
    if (Array.isArray(rolePreferences)) updateFields.rolePreferences = rolePreferences;

    const updated = await Student.findByIdAndUpdate(req.params.id, updateFields, { new: true });
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

    if (!event?.rsvps?.length) {
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
    console.error(`Matching error for student ${req.user._id} and event ${req.query.eventId}:`, error.message);
    res.status(500).json({ message: "Failed to get teammate recommendations", error: error.message });
  }
};

module.exports = {
  getStudentProfile,
  updateStudentProfile,
  updateSkillsAndRoles,
  getRecommendedTeammates,
};
