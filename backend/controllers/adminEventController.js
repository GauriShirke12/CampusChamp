const Event = require("../models/Event");
const Registration = require("../models/Registration");

// Get all events
exports.getAllEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

// Create new event
exports.createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;
  const event = await Event.create({ title, description, date, location });
  res.status(201).json(event);
};

// Update event
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const updated = await Event.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

// Delete event
exports.deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
};

// Get registrations for a specific event
exports.getEventRegistrations = async (req, res) => {
  const registrations = await Registration.find({ eventId: req.params.id }).populate("studentId", "-password");
  res.json(registrations);
};
