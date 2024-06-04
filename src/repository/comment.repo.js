const Post = require("../model/post.model");
const { convertToObjectId } = require("../utils");
const { NotFoundError } = require("../core/response/error.response");

async function findOnePost({ post_id }) {
  const post = await Post.findById(convertToObjectId(post_id));
  if (!post) {
    throw new NotFoundError("Post not found");
  }
  return post;
}

module.exports = findOnePost; // Export the function directly
