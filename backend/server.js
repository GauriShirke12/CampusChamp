
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app); // create server manually
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

// Make `io` available globally
app.set("io", io);

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/register", require("./routes/registration"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/student", require("./routes/student"));
app.use("/api/events", require("./routes/event"));
app.use("/api/invite", require("./routes/invite"));
app.use("/api/teams", require("./routes/team"));
app.use("/api/admin", require("./routes/admin"));

// Default route
app.get("/", (req, res) => res.send("CampusChamp API"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
