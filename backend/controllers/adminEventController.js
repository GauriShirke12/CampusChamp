const Event = require("../models/Event");
const Registration = require("../models/Registration");

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    if (!title || !date || !location) {
      return res.status(400).json({ message: "Title, date, and location are required" });
    }

    const newEvent = await Event.create({ title, description, date, location });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ message: "Failed to create event" });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(500).json({ message: "Failed to update event" });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res.status(500).json({ message: "Failed to delete event" });
  }
};

// Get all registrations for a specific event
exports.getEventRegistrations = async (req, res) => {
  try {
    const { id } = req.params;

    const registrations = await Registration.find({ eventId: id }).populate("studentId", "-password");

    res.status(200).json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error.message);
    res.status(500).json({ message: "Failed to fetch registrations" });
  }
};

//  Send a real-time notification via Socket.IO
exports.sendQuizEndingNotification = (req, res) => {
  try {
    const io = req.app.get("io");

    io.emit("notification", {
      title: "Quiz ends soon!",
      message: "5 minutes left to finish your quiz.",
    });

    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error("Error sending notification:", error.message);
    res.status(500).json({ message: "Failed to send notification" });
  }
};
