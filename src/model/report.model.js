const { default: mongoose } = require("mongoose");
const DOCUMENT_NAME = "Report";
const COLLECTION_NAME = "Reports";
const report = mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },

    reportType: {
      type: String,
      enum: ["account", "post"],
      require: true,
      default: "post",
    },

    reason: {
      type: String,
      require: true,
    },

    linkToPost: {
      type: String,
      require: true,
    },

    reportStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = mongoose.model(DOCUMENT_NAME, report);
