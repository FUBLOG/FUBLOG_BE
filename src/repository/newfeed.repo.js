"use strict";
const newfeedsModel = require("../model/newfeeds.model");

const createNewFeed = async ({ userId, friendId, content }) => {
  return await newfeedsModel.create({ userId, friendId, post: content });
};

const getPublicNewFeeds = async ({ page, limit, seenIds }) => {
  const offset = page * limit;
  const feeds = await newfeedsModel
    .find({ friendId: null, _id: { $nin: seenIds } })
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
    .populate({
      path: "post",
      model: "Post",
      populate: {
        path: "postTagID",
        model: "Tag",
      },
    })
    .lean();
  return feeds;
};

const getFriendNewFeeds = async ({ userId, page, limit }) => {
  const offset = page * limit;
  const feeds = await newfeedsModel
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
    .populate({
      path: "post",
      model: "Post",
      populate: {
        path: "postTagID",
        model: "Tag",
      },
    })
    .lean();
  deleteNewFeed(feeds.map((feed) => feed._id));
  return feeds;
};

const deleteNewFeed = async (feeds) => {
  newfeedsModel.deleteMany({ _id: { $in: feeds } });
};

const updateRankMessage = async(conversation, icr) => {
   await newfeedsModel.updateMany(
    {
      userId: { $in: conversation.participants },
      friendId: { $in: conversation.participants },
    },
    {
      $inc: { rank: icr },
    }
  );
};
module.exports = {
  createNewFeed,
  getPublicNewFeeds,
  getFriendNewFeeds,
  updateRankMessage,
};
