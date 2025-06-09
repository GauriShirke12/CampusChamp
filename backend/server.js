
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect to DB
connectDB();

// Middleware (must be before routes!)
app.use(cors());
app.use(express.json()); // To parse JSON body

// Routes
app.use("/api/register", require("./routes/registration"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/student", require("./routes/student"));
app.use("/api/events", require("./routes/event"));
app.use("/api/invite", require("./routes/invite")); 
app.use("/api/teams", require("./routes/team"));    

// Root route
app.get("/", (req, res) => res.send("CampusChamp API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
