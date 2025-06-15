const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const adminOnly = async (req, res, next) => {
  try {
    // If already authenticated by protect middleware
    if (req.user && req.user.role === "admin") {
      return next();
    }

    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    const user = await Student.findById(decoded.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Admin middleware error:", err.message);
    return res.status(400).json({ message: "Invalid token or unauthorized" });
  }
};

module.exports = adminOnly;
