const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();  // Load env variables

const app = express();  // Initialize express app

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const eventRoutes = require("./routes/event"); // ADD THIS

app.use("/api", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/event", eventRoutes); // ADD THIS

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
