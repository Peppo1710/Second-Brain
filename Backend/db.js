const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1); 
  }
}

module.exports = connect;
