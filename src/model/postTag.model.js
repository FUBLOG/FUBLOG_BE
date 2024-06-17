const { default: mongoose } = require("mongoose");

const DOCUMENT_NAME = "Tag";
const COLLECTION_NAME = "Tags";

const postTag = mongoose.Schema(
  {
    postTagContent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = mongoose.model(DOCUMENT_NAME, postTag);
