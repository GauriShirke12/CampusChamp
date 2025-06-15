const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// -----------------------------
//  Connect to MongoDB
// -----------------------------
connectDB();

// -----------------------------
//  CORS & JSON Middleware
// -----------------------------
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// -----------------------------
//  Socket.IO Setup
// -----------------------------
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.set("io", io);

io.on("connection", (socket) => {
  console.log(" Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log(" Client disconnected:", socket.id);
  });
});

// -----------------------------
//  API Routes
// -----------------------------
app.use("/api/auth", require("./routes/auth"));
app.use("/api/register", require("./routes/registration"));
app.use("/api/student", require("./routes/student"));
app.use("/api/events", require("./routes/event"));
app.use("/api/invite", require("./routes/invite"));
app.use("/api/teams", require("./routes/team"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/leaderboard", require("./routes/leaderboard")); 

// -----------------------------
// Health Check
// -----------------------------
app.get("/", (req, res) => {
  res.send("CampusChamp API is running");
});

// -----------------------------
// 404 Not Found Handler
// -----------------------------
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// -----------------------------
// Central Error Handler
// -----------------------------
app.use((err, req, res, next) => {
  console.error("Internal Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// -----------------------------
// Start Server
// -----------------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
