const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const {
  userSchemaRegister,
  userSchemaLogin,
} = require("../schemas/userSchema");

const mysecret = process.env.JWT_SECRET || "Pheonix";

router.post("/register", async (req, res) => {
  const { email, password, fullname, mobile } = req.body;
  const response = userSchemaRegister.safeParse({
    email,
    password,
    fullname,
    mobile,
  });

  if (!response.success) {
    return res.status(400).json({
      msg: "Validation failed",
      errors: response.error.errors,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = jwt.sign({ email }, mysecret, { expiresIn: "1h" });
  const newUser = new User({
    fullname: fullname,
    email: email,
    password: hashedPassword,
    jwt: token,
    mobile: mobile,
  });
  await newUser.save();
  res.json({
    msg: "Account Created Successfully",
    data: response.data,
    token: token,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const response = userSchemaLogin.safeParse({ email, password });
  if (!response.success) {
    return res.status(401).json({
      msg: "Details are not correct",
      errors: response.error.errors,
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }
    const token = jwt.sign({ email }, mysecret, { expiresIn: "1h" });

    existingUser.jwt = token;
    await existingUser.save();
    res.json({ msg: "Login successful", token: token });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});
module.exports = router;
