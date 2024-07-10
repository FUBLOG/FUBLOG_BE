"use strict";

const {
  createNewFeed,
  getPublicNewFeeds,
  getFriendNewFeeds,
} = require("../repository/newfeed.repo");
const { getFriendsList } = require("../repository/userInfo.repo");

class NewFeedsService {
  static async getPublicNewFeeds({ page, limit, seenIds, tagId }) {
    return await getPublicNewFeeds({ page, limit, seenIds, tagId });
  }
  static async getFriendNewFeeds({ userId, page, limit,tagId }) {
    return await getFriendNewFeeds({ userId, page, limit,tagId });
  }
  static async pushNewFeed({ userId, post }) {
    const user = await getFriendsList(userId);
    if (user?.friendList?.length === 0) return;
    user?.friendList?.forEach((friend) => {
      createNewFeed({
        userId: userId,
        friendId: friend,
        content: post,
      });
    });
  }
  static async pushPublicNewFeed({ userId, post }) {
    createNewFeed({
      userId: userId,
      friendId: null,
      content: post,
    });
  }
}
module.exports = NewFeedsService;
