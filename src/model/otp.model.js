"use strict";
const { model, Schema } = require("mongoose");
const DOCUMENT_NAME = "OTP";
const COLLECTION_NAME = "OTPs";
const otpSchema = new Schema(
  {
    otp_token: {
      type: String,
      required: true,
    },
    otp_email: {
      type: String,
      required: true,
    },
    otp_status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "verified", "block"],
    },
    otp_sign: {
      type: String,
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
module.exports = model(DOCUMENT_NAME, otpSchema);
