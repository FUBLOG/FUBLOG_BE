"use strict";

const { model, Schema } = require("mongoose");
const DOCUMENT_NAME = "template_email";
const COLLECTION_NAME = "template_emails";
const templeEmailSchema = new Schema(
  {
    template_name: {
      type: String,
      required: true,
    },
    template_subject: {
      type: String,
      required: true,
    },
    template_html: {
      type: String,
      required: true,
    },
    template_status: {
      type: String,
      required: true,
      default: "active",
      enum: ["active", "inactive"],
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
module.exports = model(DOCUMENT_NAME, templeEmailSchema);
