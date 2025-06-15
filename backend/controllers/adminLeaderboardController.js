const Student = require("../models/Student");

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Student.find()
      .sort({ dsaScore: -1 })
      .limit(10)
      .select("name dsaScore");

    res.json(leaderboard);
  } catch (err) {
    console.error("Fetching leaderboard failed:", err.message);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};

exports.updateStudentScores = async (req, res) => {
  try {
    const { id } = req.params;
    const { dsaScore } = req.body;

    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (dsaScore !== undefined) {
      student.dsaScore = dsaScore;
      await student.save();
    }

    const io = req.app.get("io");
    const updatedLeaderboard = await Student.find()
      .sort({ dsaScore: -1 })
      .limit(10);

    io.emit("leaderboardUpdated", updatedLeaderboard);

    res.json({ message: "Student score updated successfully." });
  } catch (err) {
    console.error("Update student score failed:", err.message);
    res.status(500).json({ message: "Failed to update score" });
  }
};
