const post = require("../model/post.model");
const {
  NotFoundError,
  UnprocessableEntityError,
} = require("../core/response/error.response");
const {
  createNewPost,
  updatePost,
  findPost,
  findAllPostOfUser,
} = require("../repository/post.repo");
const deleteImage = require("../helpers/deleteImage");
const validator = require("../core/validator");
const NewFeedsService = require("./newfeeds.service");
const {
  findPostByTagForGuest,
  findPostByTagForUser,
  findDelete,
} = require("../repository/newfeed.repo");

class PostService {
  createPost = async ({ userId, post = {}, filesData = [], traceId }) => {
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
    const post = await findPost(id);
    if (!post) throw new NotFoundError("Cannot Find Post Id");
    return post;
  };

  updatePost = async ({ id }, data, filesData) => {
    return await updatePost(id, data, filesData);
  };

  deletePost = async ({ id }) => {
    const deletePost = await post.findByIdAndDelete(id);
    if (!deletePost) {
      throw new NotFoundError("Cannot find ID");
    }else{
      await findDelete(id);
    }
    return deletePost;
  };

  findPostByTagForGuest = async ({ id, seenIds, page, limit }) => {
    const findPostsByTag = await findPostByTagForGuest({
      tagId: id,
      page,
      limit,
      seenIds,
    });
    if (!findPostsByTag) throw new NotFoundError();
    return findPostsByTag;
  };

  findPostByTagForUser = async ({ id, seenIds, page, limit, userId }) => {
    const findPostsByTag = await findPostByTagForUser({
      tagId: id,
      page,
      limit,
      seenIds,
      userId,
    });
    const newLimit =
      findPostsByTag?.length > 0 ? limit - findPostsByTag?.length : limit;

    const publicPosts = await findPostByTagForGuest({
      tagId: id,
      page,
      limit: newLimit,
      seenIds,
    });
    const feeds = publicPosts.concat(findPostsByTag).sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return { posts: feeds, seen: publicPosts.map((post) => post._id) };
  };

  findPostByUserId = async ({ id }) => {
    const findPostsByUser = await findAllPostOfUser(id);
    if (!findPostsByUser) throw new NotFoundError();
    return findPostsByUser;
  };
  getPostsForUser = async ({ userId, page, limit, seenIds, tagId }) => {
    const friendPosts = await NewFeedsService.getFriendNewFeeds({
      userId,
      page,
      limit: limit / 2,
      tagId,
    });

    const newLimit =
      friendPosts?.length > 0 ? limit - friendPosts?.length : limit;
    const publicPosts = await NewFeedsService.getPublicNewFeeds({
      page,
      limit: newLimit,
      seenIds,
      tagId,
    });
    const posts = publicPosts.concat(friendPosts).sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return { posts, seen: publicPosts.map((post) => post._id) };
  };
  getPostsForGuest = async ({ page, limit, seenIds, tagId }) => {
    const feeds = await NewFeedsService.getPublicNewFeeds({
      page,
      limit,
      seenIds,
      tagId,
    });
    return feeds;
  };
}
module.exports = new PostService();
