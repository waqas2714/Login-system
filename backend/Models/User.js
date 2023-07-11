const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is Required."],
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Please provide a valid Email.",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is Required."],
      // minLength: [6, "Password must contain atleast 6 characters."],
      // maxLength: [20, "Password must contain atmost 20 characters."],
    }
  }
);

const User = mongoose.model("User",userSchema)

module.exports = User;