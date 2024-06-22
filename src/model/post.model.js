const mongoose = require("mongoose");
const newFeed = require("./newfeeds.model");
const { NotFoundError } = require("../core/response/error.response");

const DOCUMENT_NAME = "Post";
const COLLECTION_NAME = "Posts";
<<<<<<< HEAD

const postSchema = new mongoose.Schema(
=======
const newfeedsModel = require("./newFeeds.model");
const postSchemas = mongoose.Schema(
>>>>>>> 9f585e20e3c57242eb95672bf5622f8f37f7f004
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

postSchema.pre("findOneAndUpdate", async function (next) {
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

postSchema.post("findOneAndUpdate", async function (doc, next) {
  if (!doc) return next();

  if (!doc.isModified("score")) return next();
  
  const scoreChange = doc.score - oldScore;
<<<<<<< HEAD
  try {
    await newFeed.findOneAndUpdate(
      { postId: doc._id },
      {
        $set: {
          rank: {
            inc: scoreChange,
          },
        },
=======
  newfeedsModel.updateMany(
    { postId: doc._id },
    {
      rank: {
        inc: scoreChange,
>>>>>>> 9f585e20e3c57242eb95672bf5622f8f37f7f004
      },
      { new: true }
    );
    console.log("Updated rank in NewFeed");
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = mongoose.model(DOCUMENT_NAME, postSchema);
