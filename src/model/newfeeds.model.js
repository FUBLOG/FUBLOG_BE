const mongoose = require("mongoose");
const DOCUMENT_NAME = "NewFeed";
const COLLECTION_NAME = "NewFeeds";

const newFeedSchemas = new mongoose.Schema(
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

newFeedSchemas.post("findOneAndUpdate", async function (doc, next) {
  if (doc.isModified("timeDecay")) {
    doc.rank = doc.rank - 10;
    await doc.save();
  }
  next();
});

if (!mongoose.models[DOCUMENT_NAME]) {
  mongoose.model(DOCUMENT_NAME, newFeedSchemas);
}

module.exports = mongoose.models[DOCUMENT_NAME];
