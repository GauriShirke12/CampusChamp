const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const adminOnly = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Student.findById(decoded.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = adminOnly;
