"use strict";

const {
  NotFoundError,
  ConflictRequestError,
  UnprocessableEntityError,
} = require("../core/response/error.response");
const { findUserById, findUserDetailById } = require("../repository/user.repo");
const {
  findRequest,
  createRequest,
  deleteRequest,
  findAllRequests,
  findForSocket,
} = require("../repository/friend.repo");
const {
  findUserInfoById,
  updateFriendList,
  unfriend,
  updateBlockList,
  unBlock,
  checkFriend,
} = require("../repository/userInfo.repo");
const { getReceiverSocketId } = require("../config/socket.config");
const notificationService = require("./notification.service");
const { isEmpty } = require("../core/validator/index");
const { isMongoId } = require("validator");
class FriendService {
  static sendFriendRequest = async ({ sourceID = "", targetID = "" }) => {
    const check = await isEmpty(targetID);
    if (check) throw new UnprocessableEntityError("Missing targetID");
    if (!isMongoId(sourceID) || !isMongoId(targetID))
      throw new UnprocessableEntityError("Invalid userID");
    const sender = await findUserById(sourceID);
    const receiver = await findUserById(targetID);

    if (!sender || !receiver) {
      throw new NotFoundError("User not exist");
    }

    const existingRequest = await findRequest(sourceID, targetID);

    if (existingRequest) {
      throw new ConflictRequestError("Friend request already sent");
    }
    const request = await findRequest(targetID, sourceID);
    if (request) {
      return this.acceptFriendRequest({ sourceID, targetID });
    }

    const createdRequest = await createRequest(sourceID, targetID);

    //socket
    const receiverSocketId = getReceiverSocketId(targetID);

    if (receiverSocketId) {
      const request = await findForSocket(sourceID, targetID);
      io.to(receiverSocketId).emit("friendRequest", request);
    }
    return createdRequest;
  };

  static acceptFriendRequest = async ({ sourceID = "", targetID = "" }) => {
    const check = await isEmpty(targetID);
    if (check) throw new UnprocessableEntityError("Missing targetID");
    if (!isMongoId(sourceID) || !isMongoId(targetID))
      throw new UnprocessableEntityError("Invalid userID");
    const existingRequest = await findRequest(targetID, sourceID);

    if (!existingRequest) {
      throw new NotFoundError("Friend request not found");
    }

    const sender = await findUserDetailById({ _id: sourceID });
    const receiver = (await findUserDetailById({ _id: targetID })) || {};

    const friendSender = {
      friend_id: targetID,
      displayName: receiver?.displayName,
      avatar: receiver?.userInfo?.avatar,
      profileHash: receiver?.profileHash,
    };
    await updateFriendList(sourceID, friendSender);

    const friendReceiver = {
      friend_id: sourceID,
      displayName: sender?.displayName,
      avatar: sender?.userInfo?.avatar,
      profileHash: sender?.profileHash,
    };
    await updateFriendList(targetID, friendReceiver);
    //send notification
    notificationService.sendNotification({
      type: "friend",
      link: sourceID,
      user_id: targetID,
    });
    return await deleteRequest(sourceID, targetID);
  };

  static getAllFriendRequests = async (userID = "") => {
    const requests = await findAllRequests(userID);
    return requests;
  };

  static declineFriendRequest = async ({ sourceID = "", targetID = "" }) => {
    const check = await isEmpty(targetID);
    if (check) throw new UnprocessableEntityError("Missing targetID");
    if (!isMongoId(sourceID) || !isMongoId(targetID))
      throw new UnprocessableEntityError("Invalid userID");
    const existingRequest = await findRequest(targetID, sourceID);
    if (!existingRequest) {
      throw new NotFoundError("Friend request not found");
    }

    return await deleteRequest(sourceID, targetID);
  };

  static handleUnfriend = async (userId, friendId) => {
    await unfriend(userId, friendId);
    await unfriend(friendId, userId);
  };

  static unFriend = async ({ sourceID = "", targetID = "" }) => {
    const check = await isEmpty(targetID);
    if (check) throw new UnprocessableEntityError("Missing targetID");
    if (!isMongoId(sourceID) || !isMongoId(targetID))
      throw new UnprocessableEntityError("Invalid userID");
    //check if the user is not friend
    const existFriend = await checkFriend(sourceID, targetID);
    if (!existFriend) {
      throw new NotFoundError("User is not friend");
    }
    await this.handleUnfriend(sourceID, targetID);
    return null;
  };

  static blockFriend = async ({ sourceID = "", targetID = "" }) => {
    const check = await isEmpty(targetID);
    if (check) throw new UnprocessableEntityError("Missing targetID");
    if (!isMongoId(sourceID) || !isMongoId(targetID))
      throw new UnprocessableEntityError("Invalid userID");

    await this.handleUnfriend(sourceID, targetID);

    const receiver = await findUserDetailById({ _id: targetID });

    const friendSender = {
      friend_id: targetID,
      displayName: receiver?.displayName,
      avatar: receiver?.userInfo?.avatar,
      profileHash: receiver?.profileHash,
    };
    await updateBlockList(sourceID, friendSender);
    return null;
  };

  static unBlockFriend = async ({ sourceID = "", targetID = "" }) => {
    const check = await isEmpty(targetID);
    if (check) throw new UnprocessableEntityError("Missing targetID");
    if (!isMongoId(sourceID) || !isMongoId(targetID))
      throw new UnprocessableEntityError("Invalid userID");
    await unBlock(sourceID, targetID);
    return null;
  };

  static getFriends = async (userId) => {
    const userInfo = await findUserInfoById(userId);
    const friendList = userInfo?.friendList || [];
    return friendList;
  };

  static getBlockedUsers = async (userId) => {
    const userInfo = await findUserInfoById(userId);
    const blockList = userInfo?.blockList || [];
    return blockList;
  };

  static getFriendRequest = async ({ sourceID = "", targetID = "" }) => {
    const check = await isEmpty(targetID);
    if (check) throw new UnprocessableEntityError("Missing targetID");
    if (!isMongoId(sourceID) || !isMongoId(targetID))
      throw new UnprocessableEntityError("Invalid userID");
    if (!isMongoId(sourceID) || !isMongoId(targetID)) {
      throw new NotFoundError("invalid userID");
    }
    const existingRequest = await findRequest(sourceID, targetID);
    if (!existingRequest) {
      const otherRequest = await findRequest(targetID, sourceID);
      return otherRequest;
    }
    return existingRequest;
  };
}

module.exports = FriendService;
