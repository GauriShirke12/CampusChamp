const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*", // You can limit this to frontend URL in production
    methods: ["GET", "POST"],
  },
});

// Attach Socket.IO instance to app so it can be accessed elsewhere
app.set("io", io);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
try {
  app.use("/api/register", require("./routes/registration"));
  app.use("/api/auth", require("./routes/auth"));
  app.use("/api/student", require("./routes/student"));
  app.use("/api/events", require("./routes/event"));
  app.use("/api/invite", require("./routes/invite"));
  app.use("/api/teams", require("./routes/team"));
  app.use("/api/admin", require("./routes/admin")); // Make sure `adminMiddleware.js` exists
} catch (err) {
  console.error("Error loading routes:", err.message);
}

// Default route
app.get("/", (req, res) => res.send("CampusChamp API is running "));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
