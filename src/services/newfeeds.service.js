"use strict";

const { createNewFeed } = require("../repository/newfeed.repo");
const { getFriendsList } = require("../repository/userInfo.repo");

class NewFeedsService {
  static async getNewFeeds() {
    return [
      {
        id: 1,
        title: "Newfeeds 1",
        content: "Content 1",
      },
      {
        id: 2,
        title: "Newfeeds 2",
        content: "Content 2",
      },
      {
        id: 3,
        title: "Newfeeds 3",
        content: "Content 3",
      },
      {
        id: 4,
        title: "Newfeeds 4",
        content: "Content 4",
      },
    ];
  }
  static async pushNewFeed({ userId, post }) {
    const friendsList = await getFriendsList(userId);
    if (friendsList.length === 0) return;
    friendsList.forEach((friend) => {
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
