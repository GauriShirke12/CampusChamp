const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => res.send("CampusChamp API"));

app.use("/api/student", require("./routes/student"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
