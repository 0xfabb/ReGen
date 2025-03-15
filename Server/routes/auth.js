const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  userSchemaRegister,
  userSchemaLogin,
} = require("../schemas/userSchema");

const mysecret = process.env.JWT_SECRET || "Pheonix";

router.post("/register", (req, res) => {
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
  const token = jwt.sign({ email }, mysecret, { expiresIn: "1h" });
  res.json({
    msg: "Account Created Successfully",
    data: response.data,
    token: token,
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const recievedToken = req.headers.authorization?.split(" ")[1];
  if (!recievedToken) {
    return res.status(401).json({ msg: "No token provided" });
  }
  const response = userSchemaLogin.safeParse({ email, password });
  if (!response.success) {
    return res.status(401).json({
      msg: "Details are not correct",
      errors: response.error.errors,
    });
  }
  const verifiedValue = jwt.verify(recievedToken, mysecret);
  if (verifiedValue.email != email) {
    return res.status(401).json({ msg: "Invalid token" });
  }

  res.json({
    msg: "You are Logged in",
    data: response.data,
  });
});
module.exports = router;
