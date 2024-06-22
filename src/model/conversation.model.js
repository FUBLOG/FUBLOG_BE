"use strict";
const { model, Schema, default: mongoose } = require("mongoose");
const newFeedsModel = require("./newfeeds.model");
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
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
let oldScore;
conversationSchema.pre("findOneAndUpdate", function (next) {
  this.findOne({}, function (err, doc) {
    if (err) {
      console.error(err);
    } else {
      oldScore = doc.score;
    }
  });
  next();
});

conversationSchema.post("findOneAndUpdate", function (doc) {
  if (!doc.isModified("score")) return next();
  const scoreChange = doc.score - oldScore;
  newFeedsModel.updateMany(
    {
      userId: { $in: doc.participants },
      friendId: { $in: doc.participants },
    },
    {
      $inc: { rank: scoreChange },
    },
    { new: true }
  );
});

module.exports = model(DOCUMENT_NAME, conversationSchema);
