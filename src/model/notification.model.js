const mongoose = require("mongoose");
const DOCUMENT_NAME = "Notification";
const COLLECTION_NAME = "Notifications";
const notificationSchemas = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["comment", "system", "friend"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
module.exports = mongoose.model(DOCUMENT_NAME, notificationSchemas);
