const mongoose = require("../db/conn");
const { Schema } = mongoose;

//helpers
const ObjectId = require("mongoose").Types.ObjectId;

const User = mongoose.model(
  "User",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },

      password: {
        type: String,
        required: true,
      },
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
    },
    { timestamps: true }
  )
);

module.exports = User;
