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
      { $inc: { commentCount: increment, score: increment * 10 } }
    );

    return { success: true };
  }
}

module.exports = new commentRepo();
