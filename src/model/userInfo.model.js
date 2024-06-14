const mongoose = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "UserInfo";
const COLLECTION_NAME = "UserInfos";
// Declare the Schema of the Mongo model
const friendSchema = new mongoose.Schema({
  friend_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profileHash: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  displayName: {
    type: String,
    required: true,
    default: "",
  },
});
var userInfoSchema = new mongoose.Schema(
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
      type: [friendSchema],
      default: "",
    },
    blockList: {
      type: [friendSchema],
      default: "",
    },
    avatarList: {
      type: [String],
      default: "",
    },
    coverList: {
      type: [String],
      default: "",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userInfoSchema);
