const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: Date,
  // RSVP: array of students who joined
  rsvps: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  }],
  // Optional: store scores or points per student
  scores: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    score: Number,
  }],
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
