const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Attach io to app for use in controllers
app.set("io", io);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// API Routes
app.use("/api/register", require("./routes/registration"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/student", require("./routes/student"));
app.use("/api/events", require("./routes/event"));
app.use("/api/invite", require("./routes/invite"));
app.use("/api/teams", require("./routes/team"));
app.use("/api/admin", require("./routes/admin"));

// Default route
app.get("/", (req, res) => res.send("CampusChamp API is running"));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Centralized Error Handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
