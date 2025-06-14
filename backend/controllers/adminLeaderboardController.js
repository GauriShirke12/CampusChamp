const Student = require("../models/Student");
const { io } = require("../server");

exports.updateStudentScores = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });

  student.dsaScore = req.body.dsaScore || student.dsaScore;
  await student.save();

  const updatedLeaderboard = await Student.find().sort({ dsaScore: -1 }).limit(10);
  io.emit("leaderboardUpdated", updatedLeaderboard);  //  Send live update

  res.json({ message: "Score updated" });
};


// Get leaderboard sorted by DSA score + quiz score
exports.getLeaderboard = async (req, res) => {
  const students = await Student.find().select("-password").sort({ dsaScore: -1, quizScore: -1 });
  res.json(students);
};

// Update a student's score or rank
exports.updateStudentScores = async (req, res) => {
  const { id } = req.params;
  const { dsaScore, quizScore, dsaRank } = req.body;

  const student = await Student.findById(id);
  if (!student) return res.status(404).json({ message: "Student not found" });

  if (dsaScore !== undefined) student.dsaScore = dsaScore;
  if (quizScore !== undefined) student.quizScore = quizScore;
  if (dsaRank !== undefined) student.dsaRank = dsaRank;

  await student.save();
  res.json({ message: "Student scores updated", student });
};
