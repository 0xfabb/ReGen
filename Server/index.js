const express = require("express");
const app = express();
const cors = require("cors");
const { connectToMongoDB } = require("./connection");
const mongodb = require("mongodb");
const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv");
dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not set.");
  process.exit(1);
}

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", homeRoutes);
app.use("/api/v1/auth", authRoutes);

const url =
  process.env.MONGO_URI ||
  "mongodb+srv://vanshdev2305:x73AZc9I5FOGuRm9@first.djvcf.mongodb.net/";
  
 connectToMongoDB(url);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  