const Student = require("../models/Student");
const Event = require("../models/Event");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await Student.countDocuments();
    const activeUsers = await Student.countDocuments({
      workshops: { $exists: true, $not: { $size: 0 } },
    });

    const events = await Event.find();
    const eventStats = events.map((event) => ({
      name: event.title,
      registrations: event.registeredUsers?.length || 0,
    }));

    res.json({
      totalUsers,
      activeUsers,
      eventStats,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err.message);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};
