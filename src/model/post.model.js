const mongoose = require("mongoose");
const DOCUMENT_NAME = "Post";
const COLLECTION_NAME = "Posts";
const postSchemas = mongoose.Schema(
  {
    UserID: {
      type: String,
      required: true,
    },
    postTagID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostTag",
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
    commentCount: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
    timeDecay: {
      type: Number,
      default: 100,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
module.exports = mongoose.model(DOCUMENT_NAME, postSchemas);
