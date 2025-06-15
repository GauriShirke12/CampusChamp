const Event = require("../models/Event");
const Student = require("../models/Student");

// POST /api/events
const createEvent = async (req, res) => {
  try {
    const { title, eventType, date, description } = req.body;

    if (!title || !eventType || !date) {
      return res.status(400).json({ message: "Title, type, and date are required" });
    }

    const event = await Event.create({
      title,
      eventType,
      date,
      description,
      rsvps: [],
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ message: "Failed to create event" });
  }
};

// PUT /api/events/:eventId/rsvp
const rsvpEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.rsvps.includes(userId)) {
      return res.status(400).json({ message: "Already RSVPed" });
    }

    event.rsvps.push(userId);
    await event.save();

    res.status(200).json({ message: "RSVP successful" });
  } catch (error) {
    console.error("Error RSVPing:", error.message);
    res.status(500).json({ message: "Failed to RSVP" });
  }
};

// GET /api/events
const getEvents = async (req, res) => {
  try {
    const filter = req.query.type ? { eventType: req.query.type } : {};
    const events = await Event.find(filter).sort({ date: 1 });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error getting events:", error.message);
    res.status(500).json({ message: "Failed to retrieve events" });
  }
};

// GET /api/events/leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const students = await Student.find({});
    const events = await Event.find({});

    const rsvpCount = {};
    for (const event of events) {
      for (const studentId of event.rsvps) {
        const idStr = studentId.toString();
        rsvpCount[idStr] = (rsvpCount[idStr] || 0) + 1;
      }
    }

    const leaderboard = students.map(student => {
      const score = rsvpCount[student._id.toString()] || 0;
      return {
        _id: student._id,
        name: student.name,
        collegeName: student.collegeName,
        score,
      };
    });

    leaderboard.sort((a, b) => b.score - a.score);

    let rank = 1;
    let prevScore = null;
    leaderboard.forEach((item, index) => {
      if (prevScore === null || item.score < prevScore) {
        rank = index + 1;
      }
      item.rank = rank;
      prevScore = item.score;
    });

    const response = leaderboard.map(({ rank, name, score, collegeName }) => ({
      rank,
      name,
      score,
      collegeName,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error generating leaderboard:", error.message);
    res.status(500).json({ message: "Failed to get leaderboard" });
  }
};

module.exports = {
  createEvent,
  rsvpEvent,
  getEvents,
  getLeaderboard,
};
