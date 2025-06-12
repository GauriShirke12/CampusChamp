const Student = require("../models/Student");
const Event = require("../models/Event"); // Assuming you have this model

exports.getDashboardStats = async (req, res) => {
  const totalUsers = await Student.countDocuments();
  const activeUsers = await Student.countDocuments({ workshops: { $exists: true, $not: { $size: 0 } } });

  const events = await Event.find();
  const eventStats = events.map((event) => ({
    name: event.title,
    registrations: event.registeredUsers.length
  }));

  res.json({
    totalUsers,
    activeUsers,
    eventStats,
  });
};
