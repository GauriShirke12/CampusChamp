const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// -- Auth & User
app.use("/api/auth", require("./routes/auth"));           // Login & Register
app.use("/api/student", require("./routes/student"));     // Student Dashboard/Profile

// -- Event & Teams
app.use("/api/events", require("./routes/event"));        // Event List / Register
app.use("/api/teams", require("./routes/team"));          // Team related
app.use("/api/invite", require("./routes/invite"));       // Team invites

// -- Admin
app.use("/api/admin", require("./routes/admin"));         // Admin features (protected)

// -- Optional custom registration (if used separately)
app.use("/api/register", require("./routes/registration"));

// Root Test Route
app.get("/", (req, res) => res.send("CampusChamp API"));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

// Global socket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Export io to use in controllers
module.exports.io = io;

