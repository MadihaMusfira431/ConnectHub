const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    likes: [
      {
        type: String,
      },
    ],

    comments: [
      {
        username: String,
        text: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);