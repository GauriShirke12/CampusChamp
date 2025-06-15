const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  collegeId: { type: String, required: true },
  collegeName: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student",
  },

  avatarUrl: { type: String },
  skills: [{ type: String }],
  rolePreferences: [{ type: String }],

  dsaScore: { type: Number, default: 0 },
  dsaRank: { type: Number, default: 0 },
  quizScore: { type: Number, default: 0 },
  workshops: [{ type: String }],
});

// Password check
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Student", studentSchema);
