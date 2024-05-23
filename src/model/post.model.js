const mongoose = require("mongoose");
const DOCUMENT_NAME = "Posts";
const COLLECTION_NAME = "Posts";
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
  likes: {
    type: Array,
    default: [],
  },
}, {timestamps: true }
);
module.exports = mongoose.model("Post", postSchems);