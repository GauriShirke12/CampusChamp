const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => res.send("CampusChamp API"));

app.use("/api/student", require("./routes/student"));

// Changed to plural 'events' for consistency
app.use("/api/events", require("./routes/event"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
