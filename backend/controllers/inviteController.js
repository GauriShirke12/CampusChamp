const Invite = require("../models/Invite");
const Team = require("../models/Team");

const getMyInvites = async (req, res) => {
  try {
    const invites = await Invite.find({ invitee: req.user._id })
      .populate("inviter", "name collegeName skills rolePreferences avatarUrl")
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

    // ✅ Validate status
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be 'accepted' or 'rejected'." });
    }

    const invite = await Invite.findById(id);
    if (!invite) {
      return res.status(404).json({ message: "Invite not found" });
    }

    // ✅ Ensure invitee is the logged-in user
    if (!invite.invitee.equals(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to respond to this invite" });
    }

    // ✅ Prevent duplicate responses
    if (["accepted", "rejected"].includes(invite.status)) {
      return res.status(400).json({ message: "Invite has already been responded to" });
    }

    invite.status = status;
    await invite.save();

    if (status === "accepted") {
      // ✅ Collect all accepted members including inviter
      const acceptedInvites = await Invite.find({
        inviter: invite.inviter,
        hackathonId: invite.hackathonId,
        status: "accepted",
      });

      const acceptedIds = new Set(acceptedInvites.map(inv => inv.invitee.toString()));
      acceptedIds.add(invite.inviter.toString()); // Include the inviter

      // ✅ If enough members, form a team
      if (acceptedIds.size >= 3) {
        const memberArray = Array.from(acceptedIds);

        // ✅ Check for existing team with same members
        const existingTeam = await Team.findOne({
          hackathonId: invite.hackathonId,
          members: { $all: memberArray, $size: memberArray.length },
        });

        if (!existingTeam) {
          const newTeam = await Team.create({
            hackathonId: invite.hackathonId,
            members: memberArray,
          });

          // ✅ Clean up other invites for this team
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
