const Post = require('../model/post.model');
const UserInfo = require('../model/userInfo.model');
const { NotFoundError, ConflictRequestError, UnprocessableEntityError } = require("../core/response/error.response");
const { findUserInfoById } = require("../repository/userInfo.repo");

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
       await post.save();
 
       return {
         userID: userID,
         postID: postID,
         countLike: post.countLike,
         likes: post.likes,
       };
    };
  

  static getLiked = async (postID) => {
   if (!postID) {
      throw new UnprocessableEntityError("Missing postID");
    }

    const post = await Post.findById(postID).populate({
      path: 'likes',
      select: 'displayName avatar profileHash',
      model: 'UserInfo',
    });

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    const likedUsers = post.likes.map(user => ({
      userID: user._id,
      displayName: user.displayName,
      avatar: user.avatar,
      profileHash: user.profileHash,
    }));

    return likedUsers;
  };
}

module.exports = LikeService;
