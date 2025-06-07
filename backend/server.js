const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect to database
connectDB();

// Middleware - must come BEFORE routes
app.use(cors());
app.use(express.json()); // ✅ move this up

// Routes
app.use("/api/register", require("./routes/registration"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/student", require("./routes/student"));
app.use("/api/events", require("./routes/event")); // plural is good!

app.get("/", (req, res) => res.send("CampusChamp API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
