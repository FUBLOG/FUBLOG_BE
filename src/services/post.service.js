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
    console.log(filesData);
    const isValidPost = await validator.validatePost(post, filesData);
    if (!isValidPost) {
      for (const file of filesData) {
        deleteImage(file?.path);
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

  ViewPost = async () => {
    const viewposts = await post.find();
    if (viewposts.length === 0) throw new NotFoundError("Cannot Find Any Post");
    return viewposts;
  };

  findPost = async (id) => {
    const viewApost = await post.findById(id);
    if (viewApost.length > 0) throw new NotFoundError("Cannot Find Post Id");
    return viewApost;
  };

  updatePost = async ({ id }, data, filesData) => {
    if (filesData) await deleteImage(aPost.postLinkToImages);
    return await updatePost(id, data, filesData);
  };

  deletePost = async ({ id }) => {
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
  getPostsForUser = async ({ userId, page, limit, seenIds }) => {
    const newLimit = limit / 2;
    const publicPosts = await NewFeedsService.getPublicNewFeeds({
      page,
      limit: newLimit,
      seenIds,
    });
    const friendPosts = await NewFeedsService.getFriendNewFeeds({
      userId,
      page,
      limit: newLimit,
    });
    const posts = publicPosts.concat(friendPosts).sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return { posts, seen: publicPosts.map((post) => post._id) };
  };
  getPostsForGuest = async ({ page, limit, seenIds }) => {
    const feeds = await NewFeedsService.getPublicNewFeeds({
      page,
      limit,
      seenIds,
    });
    return feeds;
  };
}
module.exports = new PostService();
