const express = require("express");
const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  await mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Error : ", err));
}

module.exports = { connectToMongoDB };
