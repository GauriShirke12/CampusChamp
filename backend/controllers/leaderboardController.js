const Student = require("../models/Student");
const DsaSubmission = require("../models/DsaSubmission");

const getDSALeaderboard = async (req, res) => {
  try {
    const scores = await DsaSubmission.aggregate([
      {
        $group: {
          _id: "$student",
          totalScore: { $sum: "$score" },
        },
      },
      { $sort: { totalScore: -1 } },
    ]);

    const leaderboard = await Promise.all(
      scores.map(async (entry, index) => {
        const student = await Student.findById(entry._id);
        if (!student) return null;

        return {
          rank: index + 1,
          name: student.name,
          collegeName: student.collegeName,
          score: entry.totalScore,
          profilePicture: student.avatarUrl || `https://i.pravatar.cc/100?u=${student._id}`,
        };
      })
    );

    res.json(leaderboard.filter(Boolean));
  } catch (err) {
    console.error("Leaderboard Error:", err.message);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
};

module.exports = { getDSALeaderboard };
