const Team = require("../models/Team");

// Create new team
const createTeam = async (req, res) => {
  try {
    const { name, eventId } = req.body;

    if (!name || !eventId) {
      return res.status(400).json({ message: "Team name and eventId are required" });
    }

    const team = new Team({
      name,
      eventId,
      members: [req.user._id],
    });

    await team.save();
    res.status(201).json({ message: "Team created", team });
  } catch (error) {
    console.error("Create team error:", error.message);
    res.status(500).json({ message: "Failed to create team" });
  }
};

// Join existing team
const joinTeam = async (req, res) => {
  try {
    const { teamId } = req.body;
    const team = await Team.findById(teamId);

    if (!team) return res.status(404).json({ message: "Team not found" });

    if (team.members.includes(req.user._id)) {
      return res.status(400).json({ message: "Already a member" });
    }

    team.members.push(req.user._id);
    await team.save();

    res.json({ message: "Joined team", team });
  } catch (error) {
    console.error("Join team error:", error.message);
    res.status(500).json({ message: "Failed to join team" });
  }
};

// Get logged-in user's team for an event
const getMyTeam = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const team = await Team.findOne({
      eventId,
      members: req.user._id,
    }).populate("members", "name skills rolePreferences");

    res.json(team || {});
  } catch (error) {
    console.error("Get my team error:", error.message);
    res.status(500).json({ message: "Failed to fetch team" });
  }
};

// Get all teams for an event
const getTeamByEvent = async (req, res) => {
  try {
    const teams = await Team.find({ eventId: req.params.eventId })
      .populate("members", "name");

    res.json(teams);
  } catch (error) {
    console.error("Get teams by event error:", error.message);
    res.status(500).json({ message: "Failed to fetch teams" });
  }
};

module.exports = {
  createTeam,
  joinTeam,
  getMyTeam,
  getTeamByEvent,
};
