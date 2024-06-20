"use strict";

const {
  NotFoundError,
  ConflictRequestError,
  UnprocessableEntityError,
} = require("../core/response/error.response");
const { findUserById } = require("../repository/user.repo");
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
  getFriendsList,
  checkFriend,
  getBlockedUsers,
} = require("../repository/userInfo.repo");
const { getReceiverSocketId, io } = require("../config/socket.config");
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

    await updateFriendList(sourceID, targetID);
    await updateFriendList(targetID, sourceID);
    //send notification
    notificationService.sendNotification({
      type: "friend",
      link: sourceID,
      user_id: targetID,
    });
    return await deleteRequest(targetID, sourceID);
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

    return await deleteRequest(targetID, sourceID);
  };

  static handleUnfriend = async (sourceID, targetID) => {
    await unfriend(sourceID, targetID);
    await unfriend(targetID, sourceID);
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

    const isFriend = await checkFriend(sourceID, targetID);

    if (isFriend) {
      await this.handleUnfriend(sourceID, targetID);
    }

    await updateBlockList(sourceID, targetID);
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
    return await getFriendsList(userId);
  };

  static getBlockedUsers = async (userId) => {
    return await getBlockedUsers(userId);
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

  static deleteRequestFriend = async ({ sourceID = "", targetID = "" }) => {
    return await deleteRequest(sourceID, targetID);
  };
}

module.exports = FriendService;
