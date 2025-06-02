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

// Get all events with RSVPs
const getEvents = async (req, res) => {
  try {
    const { type } = req.query;

    // If a type query param is provided, filter events by eventType
    const filter = type ? { eventType: type } : {};

    const events = await Event.find(filter).sort({ date: 1 });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to get events", error: error.message });
  }
};


// Leaderboard based on RSVP count
const getLeaderboard = async (req, res) => {
  try {
    const events = await Event.find().populate("rsvps", "name collegeName");
    const leaderboard = events.map((event) => ({
      eventTitle: event.title,
      totalRSVPs: event.rsvps.length,
    }));

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leaderboard", error: error.message });
  }
};

// Export all handlers
module.exports = {
  createEvent,
  rsvpEvent,
  getEvents,
  getLeaderboard,
};
