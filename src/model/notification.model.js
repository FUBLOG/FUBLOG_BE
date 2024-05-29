const mongoose = require("mongoose");
const DOCUMENT_NAME = "Notification";
const COLLECTION_NAME = "Notifications";
const notificationSchemas = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: "unread",
      enum: ["unread", "read"],
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
