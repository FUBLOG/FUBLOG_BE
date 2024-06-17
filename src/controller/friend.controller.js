const friendService = require("../services/friend.service");
const {
  OK,
  CREATED,
  NO_CONTENT,
} = require("../core/response/success.response");

const sendFriendRequest = async (req, res, next) => {
  const { targetID } = req.body;
  const sourceID = req.user.userId;
  const response = new CREATED({
    message: "Created request",
    metadata: await friendService.sendFriendRequest({
      sourceID,
      targetID,
    }),
  });
  response.send(res);
};

const acceptFriendRequest = async (req, res, next) => {
  const { targetID } = req.body;
  const sourceID = req.user.userId;
  const response = new NO_CONTENT({
    message: "Successfully accepted request",
    metadata: await friendService.acceptFriendRequest({
      sourceID,
      targetID,
    }),
  });
  response.send(res);
};

const declineFriendRequest = async (req, res, next) => {
  const { targetID } = req.body;
  const sourceID = req.user.userId;
  const response = new NO_CONTENT({
    message: "declined request",
    metadata: await friendService.declineFriendRequest({
      sourceID,
      targetID,
    }),
  });
  response.send(res);
};

const getAllFriendRequests = async (req, res, next) => {
  const sourceID = req.user.userId;
  const response = new OK({
    message: "listed all sent request",
    metadata: await friendService.getAllFriendRequests(sourceID),
  });
  response.send(res);
};

const unFriend = async (req, res, next) => {
  const { targetID } = req.body;
  const sourceID = req.user.userId;
  const response = new OK({
    message: "unfriended successfully",
    metadata: await friendService.unFriend({
      sourceID,
      targetID,
    }),
  });
  response.send(res);
};

const block = async (req, res, next) => {
  const { targetID } = req.body;
  const sourceID = req.user.userId;
  const response = new OK({
    message: "blocked successfully",
    metadata: await friendService.blockFriend({
      sourceID,
      targetID,
    }),
  });
  response.send(res);
};

const unblock = async (req, res, next) => {
  const { targetID } = req.body;
  const sourceID = req.user.userId;
  const response = new OK({
    message: "unblocked successfully",
    metadata: await friendService.unBlockFriend({
      sourceID,
      targetID,
    }),
  });
  response.send(res);
};

const getBlockedUsers = async (req, res, next) => {
  const sourceID = req.user.userId;
  const response = new OK({
    message: "listed all blocked users",
    metadata: await friendService.getBlockedUsers(sourceID),
  });
  response.send(res);
};

const getFriends = async (req, res, next) => {
  const sourceID = req.user.userId;
  const response = new OK({
    message: "listed all friends",
    metadata: await friendService.getFriends(sourceID),
  });
  response.send(res);
};

const getRequestFriend = async (req, res, next) => {
  const sourceID = req.user.userId;
  const { targetID } = req.params;
  const response = new OK({
    message: "response of friend request",
    metadata: await friendService.getFriendRequest({ sourceID, targetID }),
  });
  response.send(res);
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getAllFriendRequests,
  unFriend,
  block,
  unblock,
  getBlockedUsers,
  getFriends,
  getRequestFriend,
};
