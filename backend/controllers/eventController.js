const Event = require("../models/Event");

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

module.exports = {
  createEvent,
};
