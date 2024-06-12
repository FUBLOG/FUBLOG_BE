const mongoose = require("mongoose");
const postModel = require("./post.model");
const { random } = require("lodash");
const DOCUMENT_NAME = "NewFeed";
const COLLECTION_NAME = "NewFeeds";
const newFeedSchemas = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    timeDecay: {
      type: Number,
      default: 100,
    },
    rank: {
      type: Number,
      default: 100,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
newFeedSchemas.post("findOneAndUpdate", async function (doc) {
  if (doc.isModified("timeDecay")) {
    doc.rank = doc.rank - 10;
    await post.save();
  }
  next();
});
module.exports = mongoose.model(DOCUMENT_NAME, newFeedSchemas);
