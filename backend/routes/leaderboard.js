// routes/leaderboard.js
const express = require("express");
const router = express.Router();
const DsaSubmission = require("../models/DsaSubmission");
const Student = require("../models/Student");

router.get("/dsa", async (req, res) => {
  try {
    const scores = await DsaSubmission.aggregate([
      { $group: { _id: "$student", totalScore: { $sum: "$score" } } },
      { $sort: { totalScore: -1 } },
    ]);

    const fullData = await Promise.all(scores.map(async (s, idx) => {
      const student = await Student.findById(s._id);
      return {
        rank: idx + 1,
        name: student.name,
        collegeName: student.collegeName,
        score: s.totalScore,
      };
    }));

    res.json(fullData);
  } catch (err) {
    console.error("Leaderboard Error:", err);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
});

module.exports = router;
