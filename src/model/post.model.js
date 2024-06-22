const mongoose = require("mongoose");
const newFeedsModel = require("./newfeeds.model");
const DOCUMENT_NAME = "Post";
const COLLECTION_NAME = "Posts";
const postSchemas = mongoose.Schema(
  {
    UserID: {
      type: String,
      required: true,
    },
    postTagID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostTag",
      required: true,
    },
    postContent: {
      type: String,
      required: true,
    },
    postLinkToImages: {
      type: [String],
      required: false,
    },
    postStatus: {
      type: String,
      enum: ["public", "private", "friend"],
      required: true,
      default: "public",
    },
    likes: {
      type: Array,
      default: [],
    },
    countLike: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

let oldScore;

postSchemas.pre("findOneAndUpdate", async function (next) {
  try {
    const doc = await this.model.findOne(this.getQuery());
    if (!doc) {
      throw new NotFoundError("Post not found");
    }
    oldScore = doc.score;
    next();
  } catch (error) {
    next(error);
  }
});

postSchemas.post("findOneAndUpdate", async function (doc, next) {
  if (!doc) return next();

  if (!doc.isModified("score")) return next();
  
  const scoreChange = doc.score - oldScore;
  newFeedsModel.updateMany(
    { postId: doc._id },
    {
      rank: {
        inc: scoreChange,
      },
    },
    { new: true },
    function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log("Updated rank in NewFeed");
      }
      next();
    }
  );
});

module.exports = mongoose.model(DOCUMENT_NAME, postSchemas);
