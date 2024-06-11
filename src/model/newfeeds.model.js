const mongoose = require("mongoose");
const postModel = require("./post.model");
const DOCUMENT_NAME = "NewFeed";
const COLLECTION_NAME = "NewFeeds";
const newFeedSchemas = mongoose.Schema(
  {
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    friendId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
module.exports = mongoose.model(DOCUMENT_NAME, newFeedSchemas);
