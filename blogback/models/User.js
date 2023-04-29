const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default:"https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User",UserSchema);