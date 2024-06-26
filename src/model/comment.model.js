const mongoose = require("mongoose");

const DOCUMENT_NAME = "Comment";
const COLLECTION_NAME = "Comments";
const cmtSchema = new mongoose.Schema(
  {
    comment_postID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    comment_userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parent_CommentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    comment_content: {
      type: String,
      required: true,
    },
    comment_right: {
      type: Number,
      required: true,
    },

    comment_left: {
      type: Number,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, cmtSchema);
