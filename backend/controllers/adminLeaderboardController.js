const Student = require("../models/Student");

exports.updateStudentScores = async (req, res) => {
  const { id } = req.params;
  const { dsaScore } = req.body;

  const student = await Student.findById(id);
  if (!student) return res.status(404).json({ message: "Student not found" });

  student.dsaScore = dsaScore || student.dsaScore;
  await student.save();

  // Emit updated leaderboard to all connected clients
  const io = req.app.get("io");
  const updatedLeaderboard = await Student.find().sort({ dsaScore: -1 }).limit(10);
  io.emit("leaderboardUpdated", updatedLeaderboard);

  res.json({ message: "Student score updated successfully." });
};
