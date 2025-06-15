const mongoose = require("mongoose");

const DsaSubmissionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  challengeTitle: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("DsaSubmission", DsaSubmissionSchema);
