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
conversationSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const doc = await this.model.findOne(this.getQuery());
    if (!doc) {
      throw new NotFoundError("Conversation not found");
    }
    oldScore = doc.score;
    next();
  } catch (error) {
    next(error);
  }
});

conversationSchema.post("findOneAndUpdate", function (doc,next) {
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
