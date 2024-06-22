const Post = require("../model/post.model");
const { NotFoundError } = require("../core/response/error.response");

class commentRepo {
  async updateCommentCount(postID, increment) {
    const post = await Post.findById(postID);
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    await Post.findOneAndUpdate(
      { _id: postID },
      { $inc: { commentCount: increment } }
    );

    return { success: true };
  }
  

  async updatePostScore(postID, scoreChange) {
    const post = await Post.findById(postID);
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    await Post.findOneAndUpdate(
      { _id: postID },
      { $inc: { score: scoreChange } }
    );

    return { success: true };
  }
}

module.exports = new commentRepo();
