"use strict";

const conversationModel = require("../model/conversation.model");
const { convertToObjectId } = require("../utils");
const userInfoModel = require("../model/userInfo.model");
const findConversationById = async ({ senderId, receiverId }) => {
  senderId = convertToObjectId(senderId);
  receiverId = convertToObjectId(receiverId);
  return conversationModel
    .findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    })
    .lean();
};
const createConversation = async ({ senderId, receiverId }) => {
  senderId = convertToObjectId(senderId);
  receiverId = convertToObjectId(receiverId);
  return conversationModel.create({
    participants: [senderId, receiverId],
  });
};

const getMessageFromConversation = async ({ senderId, userToChatId }) => {
  senderId = convertToObjectId(senderId);
  userToChatId = convertToObjectId(userToChatId);
  return await conversationModel
    .findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    })
    .populate("messages", {
      sort: { createdAt: -1 },
    })
    .lean();
};

const pushMessageToConversation = async ({ conversationId, messageId }) => {
  conversationId = convertToObjectId(conversationId);
  messageId = convertToObjectId(messageId);
  return conversationModel.findByIdAndUpdate(conversationId, {
    $push: {
      messages: messageId,
    },
  });
};
//find user has conversation with user
const findUserHasConversation = async ({ userId }) => {
  userId = convertToObjectId(userId);
  const allConversation = await conversationModel
    .find({
      participants: {
        $all: [userId],
      },
    })
    .populate({
      path: "participants",
      select: "displayName",
    })
    .sort({ updatedAt: -1 })
    .limit(10)
    .lean();

  await Promise.all(
    allConversation.map(async (conversation, index) => {
      conversation.participants = conversation.participants.filter(
        (participant) => participant._id.toString() !== userId.toString()
      );
      let user = await userInfoModel.findOne({
        user_id: conversation.participants[index]._id,
      });
      conversation.participants[index].avatar =
        user.avatar === ""
          ? "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
          : user.avatar;
    })
  );
  return allConversation;
};
const getAllAvatar = async (conversation) => {
  return conversation.forEach(async (conversation, index) => {
    const user = await userInfoModel.findOne({
      user_id: conversation.participants[0]._id,
    });
    conversation.participants[index].avatar =
      user.avatar === ""
        ? "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
        : user.avatar;
  });
};
module.exports = {
  findConversationById,
  createConversation,
  getMessageFromConversation,
  pushMessageToConversation,
  findUserHasConversation,
  getAllAvatar,
};
