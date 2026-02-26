const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/userDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.post("/addUser", async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
  });

  await newUser.save();
  res.json({ message: "User Saved" });
});

app.get("/users", async (req, res) => {
  const users = await User.find({}, "-password"); 
  res.json(users);
});

app.put("/updateUser/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
});

app.delete("/deleteUser/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server Running on 5000"));
