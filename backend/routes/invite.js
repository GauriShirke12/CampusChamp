const express = require("express");
const router = express.Router();
const TeamInvite = require("../models/TeamInvite");
const { protect } = require("../middleware/authMiddleware");

// POST /api/invite — Send an invite
router.post("/", protect, async (req, res) => {
  const { inviteeId, hackathonId } = req.body;
  const inviterId = req.user._id;

  try {
    // Prevent duplicate invites
    const existing = await TeamInvite.findOne({
      inviter: inviterId,
      invitee: inviteeId,
      hackathonId,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({ message: "Invite already sent" });
    }

    const newInvite = new TeamInvite({ inviter: inviterId, invitee: inviteeId, hackathonId });
    await newInvite.save();

    res.status(201).json({ message: "Invite sent successfully", invite: newInvite });
  } catch (err) {
    console.error("Invite error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const invites = await TeamInvite.find({ invitee: req.user._id })
      .populate("inviter", "name collegeName skills rolePreferences")
      .populate("hackathonId", "title date");

    res.status(200).json(invites);
  } catch (err) {
    console.error("Fetch invites error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id/respond", protect, async (req, res) => {
  const { status } = req.body; // "accepted" or "rejected"
  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const invite = await TeamInvite.findById(req.params.id);
    if (!invite || invite.invitee.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Invite not found or unauthorized" });
    }

    invite.status = status;
    await invite.save();

    res.status(200).json({ message: `Invite ${status}` });
  } catch (err) {
    console.error("Respond error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
