const Post = require("../model/post.model");

const updateCommentCount = async (comment_postID, increment = 1) => {
  await Post.updateOne(
    { _id: comment_postID },
    { $inc: { commentCount: increment } }
  );
};

module.exports = updateCommentCount;
