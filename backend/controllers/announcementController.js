
const Announcement = require("../models/Announcement");

exports.createAnnouncement = async (req, res) => {
  const announcement = new Announcement(req.body);
  await announcement.save();
  io.emit("newAnnouncement", announcement); // 🔥 push to all users
  res.json({ message: "Announcement created" });
};
