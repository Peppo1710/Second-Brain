const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // email
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: Number,
  phone: String,
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
