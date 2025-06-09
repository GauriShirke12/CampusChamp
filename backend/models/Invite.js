const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
  inviter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  invitee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  hackathonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Invite", inviteSchema);
