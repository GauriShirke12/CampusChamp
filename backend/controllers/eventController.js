const Event = require("../models/Event");
const Student = require("../models/Student");

// GET /api/event/leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const events = await Event.find().populate("rsvps", "name");

    // Count RSVPs per student
    const leaderboard = {};

    events.forEach(event => {
      event.rsvps.forEach(student => {
        leaderboard[student._id] = leaderboard[student._id] || {
          _id: student._id,
          name: student.name,
          count: 0
        };
        leaderboard[student._id].count += 1;
      });
    });

    // Convert to array & sort descending by RSVP count
    const sorted = Object.values(leaderboard).sort((a, b) => b.count - a.count);

    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ message: "Leaderboard fetch failed", error: error.message });
  }
};

module.exports = {
  // other event exports...
  getLeaderboard,
};
