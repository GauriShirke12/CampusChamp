const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

// Middleware to verify admin access
const adminOnly = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Student.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Admin middleware error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminOnly;
