const getLeaderboard = async (req, res) => {
  try {
    const events = await Event.find().populate("rsvps", "name");
    const leaderboard = {};

    events.forEach(event => {
      event.rsvps.forEach(student => {
        leaderboard[student._id] = leaderboard[student._id] || {
          _id: student._id,
          name: student.name,
          count: 0
        };
        leaderboard[student._id].count += 1;
      });
    });

    const sorted = Object.values(leaderboard).sort((a, b) => b.count - a.count);
    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ message: "Leaderboard fetch failed", error: error.message });
  }
};


// POST /api/event/create
const createEvent = async (req, res) => {
  const { title, date } = req.body;

  try {
    const event = await Event.create({
      title,
      date,
      rsvps: [], // start with no RSVPs
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Event creation failed", error: error.message });
  }
};

// POST /api/event/rsvp/:eventId
const rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Prevent duplicate RSVP
    if (event.rsvps.includes(req.user._id)) {
      return res.status(400).json({ message: "Already RSVPed" });
    }

    event.rsvps.push(req.user._id);
    await event.save();

    res.status(200).json({ message: "RSVP successful" });
  } catch (error) {
    res.status(500).json({ message: "RSVP failed", error: error.message });
  }
};

module.exports = {
  createEvent,
  rsvpEvent,
  getLeaderboard,
};
