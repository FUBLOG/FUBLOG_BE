const mongoose = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "UserInfo";
const COLLECTION_NAME = "UserInfos";
// Declare the Schema of the Mongo model

const userInfoSchemas = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    cover_photo: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    education: {
      type: String,
      default: "",
    },
    relationship: {
      type: String,
      enum: [
        "single",
        "married",
        "divorced",
        "complicated",
        "in a relationship",
      ],
      default: "single",
    },
    friendList: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    blockList: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    avatarList: {
      type: [String],
      default: [],
    },
    coverList: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userInfoSchemas);
