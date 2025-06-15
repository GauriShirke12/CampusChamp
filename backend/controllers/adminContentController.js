const Workshop = require("../models/Workshop"); // Ensure you have a Workshop model

// Get all workshops (for admin view)
exports.getAllWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.json(workshops);
  } catch (err) {
    console.error("Failed to fetch workshops:", err.message);
    res.status(500).json({ message: "Server error while fetching workshops" });
  }
};

// Approve or reject a workshop
exports.updateWorkshopApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;

    const workshop = await Workshop.findById(id);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    workshop.approved = approved;
    await workshop.save();

    res.json({ message: "Workshop approval status updated" });
  } catch (err) {
    console.error("Failed to update workshop approval:", err.message);
    res.status(500).json({ message: "Server error while updating approval" });
  }
};
