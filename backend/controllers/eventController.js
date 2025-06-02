const Event = require("../models/Event");
const Student = require("../models/Student");

// Create a new event
const createEvent = async (req, res) => {
  const { title, eventType, date, description } = req.body;

  try {
    const event = await Event.create({
      title,
      eventType,
      date,
      description,
      rsvps: [],
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Event creation failed", error: error.message });
  }
};

// RSVP to an event
const rsvpEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const studentId = req.user._id;

    if (event.rsvps.includes(studentId)) {
      return res.status(400).json({ message: "Already RSVPed" });
    }

    event.rsvps.push(studentId);
    await event.save();

    res.status(200).json({ message: "RSVP successful" });
  } catch (error) {
    res.status(500).json({ message: "RSVP failed", error: error.message });
  }
};

// Get all events 
const getEvents = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { eventType: type } : {};

    const events = await Event.find(filter).sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to get events", error: error.message });
  }
};

// Leaderboard based on RSVP count per student
const getLeaderboard = async (req, res) => {
  try {
    const students = await Student.find({});
    const events = await Event.find({});

    // Map studentId => RSVP count
    const rsvpCountMap = {};

    events.forEach(event => {
      event.rsvps.forEach(studentId => {
        const idStr = studentId.toString();
        rsvpCountMap[idStr] = (rsvpCountMap[idStr] || 0) + 1;
      });
    });

    // Create leaderboard array
    const leaderboard = students.map(student => {
      const score = rsvpCountMap[student._id.toString()] || 0;
      return {
        _id: student._id,
        name: student.name,
        collegeName: student.collegeName,
        score,
      };
    });

    // Sort descending by score
    leaderboard.sort((a, b) => b.score - a.score);

    // Assign rank
    let rank = 1;
    let lastScore = null;
    leaderboard.forEach((item, index) => {
      if (lastScore === null || item.score < lastScore) {
        rank = index + 1;
      }
      item.rank = rank;
      lastScore = item.score;
    });

    // Return only requested fields
    const response = leaderboard.map(({ rank, name, score, collegeName }) => ({
      rank,
      name,
      score,
      collegeName,
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leaderboard", error: error.message });
  }
};

module.exports = {
  createEvent,
  rsvpEvent,
  getEvents,
  getLeaderboard,
};
