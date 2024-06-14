
const post = require("../model/post.model");
class commentRepo {
  async updateCommentCount(postID, increment) {
    const post = await post.findById(postID);
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    await post.findOneAndUpdate(
      { _id: postID },
      { $inc: { commentCount: increment } }
    );

    return { success: true };
}}

module.exports = new commentRepo();