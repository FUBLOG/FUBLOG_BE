const Post = require('../model/post.model');
const UserInfo = require('../model/userInfo.model');
const { NotFoundError, ConflictRequestError, UnprocessableEntityError } = require("../core/response/error.response");
const { getAllLiked } = require("../repository/like.repo");

class LikeService {
  static like = async (postID, userID) => {
    if (!postID || !userID) {
      throw new UnprocessableEntityError("Missing postID or userID");
    }

    const post = await Post.findById(postID);
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    if (post.likes.includes(userID)) {
      throw new ConflictRequestError("Post already liked by this user");
    }

    post.likes.push(userID);
    post.countLike++;
    post.score += 10; 
    await post.save();

    return {
      userID: userID,
      postID: postID,
      countLike: post.countLike,
      likes: post.likes,
    };
  };

  static unlike = async (postID, userID) => {
    if (!postID || !userID) {
      throw new UnprocessableEntityError("Missing postID or userID");
    }

    const post = await Post.findById(postID);
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    if (!post.likes.includes(userID)) {
      throw new ConflictRequestError("Post has not been liked by this user");
    }

    post.likes = post.likes.filter(like => like.toString() !== userID.toString());
    if (post.countLike > 0) {
      post.countLike--;
    }
    post.score -= 10; 
    await post.save();

    return {
      userID: userID,
      postID: postID,
      countLike: post.countLike,
      likes: post.likes,
    };
  };

  static getLiked = async (userID) => {
    const liked = await getAllLiked(userID);
    return liked;
  };
}

module.exports = LikeService;
