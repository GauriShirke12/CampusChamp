const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Student = require("./models/Student");

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const sampleStudents = [
  {
    collegeId: "1002",
    name: "Aditi",
    email: "aditi@example.com",
    password: bcrypt.hashSync("password123", 10),
    collegeName: "Tech University",
    city: "Pune",
    skills: ["React", "Figma"],
    rolePreferences: ["Frontend", "UI/UX"],
  },
  {
    collegeId: "1003",
    name: "Karan",
    email: "karan@example.com",
    password: bcrypt.hashSync("password123", 10),
    collegeName: "Code Academy",
    city: "Mumbai",
    skills: ["Node.js", "MongoDB"],
    rolePreferences: ["Backend", "DevOps"],
  },
  {
    collegeId: "1004",
    name: "Sneha",
    email: "sneha@example.com",
    password: bcrypt.hashSync("password123", 10),
    collegeName: "Sunrise Institute",
    city: "Delhi",
    skills: ["Python", "ML"],
    rolePreferences: ["Data Science", "Research"],
  },
  {
    collegeId: "1005",
    name: "Arjun",
    email: "arjun@example.com",
    password: bcrypt.hashSync("password123", 10),
    collegeName: "Innovate College",
    city: "Bangalore",
    skills: ["Java", "Spring"],
    rolePreferences: ["Backend", "Systems"],
  },
];

const importData = async () => {
  try {
    await Student.deleteMany({ email: { $in: sampleStudents.map(s => s.email) } });
    await Student.insertMany(sampleStudents);
    console.log("Sample students inserted");
    process.exit();
  } catch (error) {
    console.error("Error inserting sample students:", error);
    process.exit(1);
  }
};

importData();
