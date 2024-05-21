const mongoose = require("mongoose");
const postSchems = mongoose.Schema({
  UserID: {
    type: String,
    required: true,
  },
  postTagID: {
    type: String,
    required: true,
  },
  postContent: {
    type: String,
    required: true,
  },
  postLinkToImages: {
    type: [String],
    required: false,
  },
  postStatus: {
    type: String,
    enum: ["public", "private", "friend"],
    required: true,
    default: "public",
  },
  numberOfLikes: {
    type: Number,
    require: true,
    default: 0,
  },
});
module.exports = mongoose.model("Post", postSchems);