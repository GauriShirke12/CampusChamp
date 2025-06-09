const express = require("express");
const router = express.Router();
const Invite = require("../models/Invite");
const { protect } = require("../middleware/authMiddleware");
const { getMyInvites, respondToInvite } = require("../controllers/inviteController");

// Send an invite
router.post("/", protect, async (req, res) => {
  const { inviteeId, hackathonId } = req.body;
  const inviterId = req.user._id;

  try {
    const existing = await Invite.findOne({
      inviter: inviterId,
      invitee: inviteeId,
      hackathonId,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({ message: "Invite already sent" });
    }

    const newInvite = new Invite({
      inviter: inviterId,
      invitee: inviteeId,
      hackathonId,
    });

    await newInvite.save();

    res.status(201).json({ message: "Invite sent successfully", invite: newInvite });
  } catch (err) {
    console.error("Invite error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get invites for the logged-in user
router.get("/my-invites", protect, getMyInvites);

// Respond to invite
router.put("/respond/:id", protect, respondToInvite);

module.exports = router;
