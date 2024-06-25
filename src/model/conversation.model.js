"use strict";
const { model, Schema, default: mongoose } = require("mongoose");
const DOCUMENT_NAME = "Conversation";
const COLLECTION_NAME = "Conversations";
const conversationSchema = new Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
    score: {
      type: Number,
      default: 0,
    },
    unReadCount: {
      type: Number,
      default: 0,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);


module.exports = model(DOCUMENT_NAME, conversationSchema);
