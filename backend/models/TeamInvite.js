const mongoose = require("mongoose");

const teamInviteSchema = new mongoose.Schema({
  inviter: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  invitee: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  hackathonId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TeamInvite", teamInviteSchema);
