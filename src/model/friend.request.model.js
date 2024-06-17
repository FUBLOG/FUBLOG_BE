const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DOCUMENT_NAME = "RequestFriend";
const COLLECTION_NAME = "RequestFriends";
const requestFriendSchema = new Schema(
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
    }
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = mongoose.model(DOCUMENT_NAME, requestFriendSchema);
