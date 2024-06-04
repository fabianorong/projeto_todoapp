const mongoose = require("../db/conn");
const { Schema } = mongoose;

//helpers
const ObjectId = require("mongoose").Types.ObjectId;

const Task = mongoose.model(
  "Task",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },

      effort: {
        type: String,
        required: true,
      },

      period: {
        type: String,
        required: true,
      },

      done: {
        type: Boolean,
      },

      user: Object,
    },
    { timestamps: true }
  )
);

module.exports = Task;
