const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    enum: ["Hackathon", "Workshop", "Coding Challenge"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: String,
  rsvps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
