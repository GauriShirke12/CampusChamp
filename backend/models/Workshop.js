const mongoose = require("mongoose");

const WorkshopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  speaker: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // or "User" depending on your schema
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Workshop", WorkshopSchema);
