const express = require("express");
const router = express.Router();
const Invite = require("../models/Invite");
const { protect } = require("../middleware/authMiddleware");
const { getMyInvites, respondToInvite } = require("../controllers/inviteController");

// Send an invite
router.post("/", protect, async (req, res) => {
  try {
    const { inviteeId, hackathonId } = req.body;
    const inviterId = req.user._id;

    if (!inviteeId || !hackathonId) {
      return res.status(400).json({ message: "Invitee and Hackathon ID are required." });
    }

    const alreadyInvited = await Invite.findOne({
      inviter: inviterId,
      invitee: inviteeId,
      hackathonId,
      status: "pending",
    });

    if (alreadyInvited) {
      return res.status(400).json({ message: "You have already sent an invite to this user for this hackathon." });
    }

    const invite = new Invite({
      inviter: inviterId,
      invitee: inviteeId,
      hackathonId,
    });

    await invite.save();

    res.status(201).json({ message: "Invite sent successfully.", invite });
  } catch (err) {
    console.error("Error sending invite:", err);
    res.status(500).json({ message: "Failed to send invite. Please try again." });
  }
});

// Get invites for the logged-in user
router.get("/my-invites", protect, getMyInvites);

// Respond to invite (accept/reject)
router.put("/respond/:id", protect, respondToInvite);

module.exports = router;
