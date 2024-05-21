const mongoose = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "UserInfo";
const COLLECTION_NAME = "UserInfos";
// Declare the Schema of the Mongo model
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
      required: true,
      default: "",
    },
    cover_photo: {
      type: String,
      required: true,
      default: "",
    },
    bio: {
      type: String,
      required: true,
      default: "",
    },
    education: {
      type: String,
      required: true,
      default: "",
    },
    relationship: {
      type: String,
      required: true,
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
