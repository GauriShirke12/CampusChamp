const Invite = require("../models/Invite");
const Team = require("../models/Team");

const getMyInvites = async (req, res) => {
  try {
    const invites = await Invite.find({ invitee: req.user._id })
      .populate("inviter", "name collegeName skills rolePreferences")
      .populate("hackathonId", "title date");

    res.status(200).json(invites);
  } catch (err) {
    console.error("Error fetching invites:", err.message);
    res.status(500).json({ message: "Failed to fetch invites" });
  }
};

const respondToInvite = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status: must be accepted or rejected" });
    }

    const invite = await Invite.findById(id);
    if (!invite) return res.status(404).json({ message: "Invite not found" });

    if (!invite.invitee.equals(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to respond to this invite" });
    }

    if (invite.status === "accepted" || invite.status === "rejected") {
      return res.status(400).json({ message: "Invite already responded to" });
    }

    invite.status = status;
    await invite.save();

    if (status === "accepted") {
      const acceptedInvites = await Invite.find({
        inviter: invite.inviter,
        hackathonId: invite.hackathonId,
        status: "accepted",
      });

      const acceptedIds = acceptedInvites.map(inv => inv.invitee.toString());
      if (!acceptedIds.includes(invite.inviter.toString())) {
        acceptedIds.push(invite.inviter.toString());
      }

      if (acceptedIds.length >= 3) {
        const existingTeam = await Team.findOne({
          hackathonId: invite.hackathonId,
          members: { $all: acceptedIds },
        });

        if (!existingTeam) {
          const newTeam = await Team.create({
            hackathonId: invite.hackathonId,
            members: acceptedIds,
          });

          await Invite.deleteMany({
            inviter: invite.inviter,
            hackathonId: invite.hackathonId,
          });

          return res.status(200).json({ message: "Team successfully formed", team: newTeam });
        }
      }
    }

    res.status(200).json({ message: "Invite response recorded" });
  } catch (err) {
    console.error("Error responding to invite:", err.message);
    res.status(500).json({ message: "Failed to respond to invite" });
  }
};

module.exports = {
  getMyInvites,
  respondToInvite,
};
