const mongoose = require("mongoose"); // Erase if already required
const { profile } = require("winston");
const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    profileHash: {
      type: String,
      required: true,
      unique: true,

    },
    displayName: {
      type: String,
      required: true,
    },
    searchable:{
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    sex: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "active",
      enum: ["active", "inactive", "blocked"],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
userSchema.index({ profileHash: 1 });
userSchema.index({ displayName: "text", firstName:"text",lastName:"text" });
userSchema.virtual("userInfo", {
  ref: "UserInfo",
  localField: "_id",
  foreignField: "user_id",
  justOne: true,
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
