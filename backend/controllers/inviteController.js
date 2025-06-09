const Invite = require("../models/Invite");
const Team = require("../models/Team");
const Event = require("../models/Event");
const Student = require("../models/Student");

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

      // Find all other accepted invites for same inviter + hackathon
      const acceptedInvites = await Invite.find({
        inviter,
        hackathonId,
        status: "accepted",
      });

      // Include inviter + all accepted invitees
      const acceptedMemberIds = acceptedInvites.map((i) => i.invitee.toString());

      // Add inviter to the list
      if (!acceptedMemberIds.includes(inviter.toString())) {
        acceptedMemberIds.push(inviter.toString());
      }

      // If enough members (e.g., 3), create team
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

          // Optionally clean up other invites for this hackathon
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
