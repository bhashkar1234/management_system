const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 8002; // Change default port to 8002
const MONGODB_URL = process.env.MONGODB_URL;

const conn = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

const express = require("express");
const app = express();

conn().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
