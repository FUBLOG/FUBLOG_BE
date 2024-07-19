const mongoose = require("mongoose");

const DOCUMENT_NAME = "Report";
const COLLECTION_NAME = "Reports";

const reportSchema = new mongoose.Schema(
  {
    sourceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    reportContent: {
      type: String,
    },
    reportStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, reportSchema);
