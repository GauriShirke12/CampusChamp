const Announcement = require("../models/Announcement");

// Create a new announcement and emit to all clients
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({ message: "Title and message are required" });
    }

    const announcement = new Announcement({ title, message });
    await announcement.save();

    const io = req.app.get("io"); // Get socket instance from app
    io.emit("newAnnouncement", announcement); // Emit to all clients

    res.status(201).json({ message: "Announcement created", announcement });
  } catch (error) {
    console.error("Error creating announcement:", error.message);
    res.status(500).json({ message: "Failed to create announcement" });
  }
};
