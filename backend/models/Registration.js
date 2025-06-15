const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  collegeOrOrganization: { type: String, required: true },
  eventTitle: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
});

// Ensure uniqueness of email + event
RegistrationSchema.index({ email: 1, eventTitle: 1 }, { unique: true });

module.exports = mongoose.model("Registration", RegistrationSchema);
