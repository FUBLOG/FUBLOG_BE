const post = require("../model/post.model");
const {
  NotFoundError,
  UnprocessableEntityError,
} = require("../core/response/error.response");
const { createNewPost, updatePost } = require("../repository/post.repo");
const { BadRequestError } = require("../core/response/error.response");
const deleteImage = require("../helpers/deleteImage");
const validator = require("../core/validator");
const { HEADER } = require("../core/constans/header.constant");
const NewFeedsService = require("./newfeeds.service");

class PostService {
  createPost = async ({ userId, post = {}, filesData = [], traceId }) => {
    const isValidPost = await validator.validatePost(post, filesData);
    if (!isValidPost) {
      for (const file of filesData) {
        await deleteImage(file?.path);
      }

      throw new UnprocessableEntityError("Missing content and image");
    }
    const newPost = await createNewPost(post, filesData, userId);
    if (newPost.postStatus === "public") {
      NewFeedsService.pushPublicNewFeed({
        userId: userId,
        post: newPost,
      });
    } else if (newPost.postStatus === "friend") {
      NewFeedsService.pushNewFeed({
        userId: userId,
        post: newPost,
      });
    }
    return newPost;
  };

  viewpost = async () => {
    const viewposts = await post.find();
    if (viewposts.length === 0) throw new NotFoundError("Cannot Find Any Post");
    return viewposts;
  };
  findpost = async (id) => {
    const viewApost = await post.findById(id);
    if (viewApost.length > 0) throw new NotFoundError("Cannot Find Post Id");
    return viewApost;
  };
  updatepost = async ({ id }, data, filesData) => {
    if (filesData) await deleteImage(aPost.postLinkToImages);
    return await updatePost(id, data, filesData);
  };
  deletepost = async ({ id }) => {
    const deletePost = await post.findByIdAndDelete(id);
    if (!deletePost) throw new NotFoundError("Cannot find ID");
    return deletePost;
  };
  findPostByTag = async ({ id }) => {
    const findPostsByTag = await post.find({ postTagID: id });
    console.log(findPostsByTag);
    if (!findPostsByTag) throw new NotFoundError();
    return findPostsByTag;
  };
  findPostByUserId = async ({ id }) => {
    const findPostsByUser = await post.find({ UserID: id });
    console.log(findPostsByUser);
    if (!findPostsByUser) throw new NotFoundError();
    return findPostsByUser;
  };
  getPosts = async (req) => {
    const clientId = req.headers[HEADER.CLIENT_ID];
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    const { page, limit } = req.query;
    if (!clientId || !accessToken) {
      return await this.getPostsForGuest(page, limit);
    }
    const keyStore = await KeyTokenService.findUserById(profileHash);
    if (!keyStore) throw new NotFoundError("Not found keyStore");
    let decodeUser = {};
    const jwt = accessToken.split(" ")[1];
    decodeUser = await CryptoService.verifyToken(
      jwt,
      keyStore.publicKey,
      (err, user) => {
        if (err && err.name === "TokenExpiredError") {
          throw new BadRequestError("JWT invalid");
        }
        if (err) {
          throw new BadRequestError("Invalid request");
        }
        return user;
      }
    );
    return await this.getPostsForUser(decodeUser.userId, page, limit);
  };

  getPostsForUser = async (userId, page = 0, limit = 20) => {
    const newLimit = limit / 2;
    const publicPosts = await NewFeedsService.getPublicNewFeeds({
      page,
      newLimit,
    });
    const friendPosts = await NewFeedsService.getFriendNewFeeds({
      userId,
      page,
      newLimit,
    });
    const posts = publicPosts.concat(friendPosts).sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return posts;
  };
  getPostsForGuest = async (page = 0, limit = 20) => {
    return await NewFeedsService.getPublicNewFeeds({ page, limit });
  };
}
module.exports = new PostService();
