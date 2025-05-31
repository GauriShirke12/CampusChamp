const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();  // load env variables

const app = express();  // initialize express app

// Middleware
app.use(cors());
app.use(express.json());

// Import routes AFTER app initialization
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");

// Register routes
app.use("/api", authRoutes);
app.use("/api/student", studentRoutes);

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
