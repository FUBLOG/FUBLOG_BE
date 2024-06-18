"use strict";
const newfeedModel = require("../model/newfeeds.model");

const createNewFeed = async ({ userId, friendId, content }) => {
  return await newfeedModel.create({ userId, friendId, post: content });
};

const getPublicNewFeeds = async ({ page, limit }) => {
  const offset = page * limit;
  const feeds = await newfeedModel
    .find({ friendId: null })
    .sort({ createdAt: -1, rank: 1 })
    .skip(offset)
    .limit(limit)
    .populate({
      path: "userId",
      model: "User",
      select: "displayName userInfo",
      populate: {
        path: "userInfo",
        model: "UserInfo",
        select: "avatar -_id -user_id",
      },
    })
    .populate("post")
    .lean();
  return feeds;
};

const getFriendNewFeeds = async ({ userId, page, limit }) => {
  const offset = page * limit;
  const feeds = await newfeedModel
    .find({ friendId: userId })
    .sort({ createdAt: -1, rank: 1 })
    .skip(offset)
    .limit(limit)
    .populate({
      path: "userId",
      model: "User",
      select: "displayName userInfo",
      populate: {
        path: "userInfo",
        model: "UserInfo",
        select: "avatar -_id -user_id",
      },
    })
    .populate("post")
    .lean();
  deleteNewFeed(feeds.map((feed) => feed._id));
  return feeds;
};

const deleteNewFeed = async (feeds) => {
  newfeedModel.deleteMany({ _id: { $in: feeds } });
};
module.exports = {
  createNewFeed,
  getPublicNewFeeds,
  getFriendNewFeeds,
};
