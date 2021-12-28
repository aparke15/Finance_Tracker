const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Please enter email address"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Please enter password"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
