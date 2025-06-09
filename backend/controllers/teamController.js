// backend/controllers/teamController.js
const Team = require("../models/Team");

// Create new team
const createTeam = async (req, res) => {
  const { name, eventId } = req.body;
  const team = new Team({
    name,
    eventId,
    members: [req.user._id]
  });

  await team.save();
  res.status(201).json({ message: "Team created", team });
};

// Join existing team
const joinTeam = async (req, res) => {
  const { teamId } = req.body;

  const team = await Team.findById(teamId);
  if (!team) return res.status(404).json({ message: "Team not found" });

  if (team.members.includes(req.user._id)) {
    return res.status(400).json({ message: "Already a member" });
  }

  team.members.push(req.user._id);
  await team.save();

  res.json({ message: "Joined team", team });
};

// Get logged-in user's team for an event
const getMyTeam = async (req, res) => {
  const eventId = req.params.eventId;
  const team = await Team.findOne({
    eventId,
    members: req.user._id
  }).populate("members", "name skills rolePreferences");

  res.json(team || {});
};

// Get all teams for an event
const getTeamByEvent = async (req, res) => {
  const teams = await Team.find({ eventId: req.params.eventId }).populate("members", "name");
  res.json(teams);
};

module.exports = {
  createTeam,
  joinTeam,
  getMyTeam,
  getTeamByEvent
};
