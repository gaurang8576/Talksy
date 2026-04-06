const express = require("express");
const cors = require("cors");
import user from "./models/user.js";
require("dotenv").config();

const usersData = [
    { name: 'mamta', age: 21, email: 'mamta123@gmail.com' },
    { name: 'riya', age: 22, email: 'riya123@gmail.com' },
    { name: 'rahul', age: 23, email: 'rahul123@gmail.com' },
    { name: 'gaurang', age: 27, email: 'gaurang123@gmail.com' }
];

const connectDB = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.json(usersData);
});


//post route to add new user
app.post("/add-user", (req, res) => {
  const newUser = req.body;

  usersData.push(newUser);

  res.json({
    message: "User added successfully ✅",
    data: usersData
  });
});

// server start
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});