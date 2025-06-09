const Team = require("../models/Team");

// GET /api/teams/my-team
const getMyTeam = async (req, res) => {
  try {
    const team = await Team.findOne({ members: req.user._id }).populate("members", "name email skills");

    if (!team) {
      return res.status(404).json({ message: "No team found" });
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch team", error: error.message });
  }
};

module.exports = {
  getMyTeam,
};
