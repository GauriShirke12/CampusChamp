const Invite = require("../models/Invite");
const Team = require("../models/Team");

const getMyInvites = async (req, res) => {
  try {
    const invites = await Invite.find({ invitee: req.user._id })
      .populate("inviter", "name collegeName skills rolePreferences")
      .populate("hackathonId", "title date");

    res.status(200).json(invites);
  } catch (err) {
    console.error("Fetch invites error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const respondToInvite = async (req, res) => {
  try {
    const { id } = req.params; // invite ID
    const { status } = req.body; // "accepted" or "rejected"
    const userId = req.user._id;

    const invite = await Invite.findById(id);

    if (!invite || !invite.invitee.equals(userId)) {
      return res.status(404).json({ message: "Invite not found or unauthorized" });
    }

    invite.status = status;
    await invite.save();

    // ✅ Only proceed if accepted
    if (status === "accepted") {
      const { inviter, hackathonId } = invite;

      const acceptedInvites = await Invite.find({
        inviter,
        hackathonId,
        status: "accepted",
      });

      const acceptedMemberIds = acceptedInvites.map((i) => i.invitee.toString());

      if (!acceptedMemberIds.includes(inviter.toString())) {
        acceptedMemberIds.push(inviter.toString());
      }

      if (acceptedMemberIds.length >= 3) {
        const existingTeam = await Team.findOne({
          hackathonId,
          members: { $all: acceptedMemberIds },
        });

        if (!existingTeam) {
          const newTeam = await Team.create({
            hackathonId,
            members: acceptedMemberIds,
          });

          await Invite.deleteMany({ hackathonId, inviter });

          return res.status(200).json({
            message: "Team formed!",
            team: newTeam,
          });
        }
      }
    }

    res.status(200).json({ message: "Response recorded" });
  } catch (err) {
    console.error("Respond to invite error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMyInvites,
  respondToInvite,
};
