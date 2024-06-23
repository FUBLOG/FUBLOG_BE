"use strict";

const conversationModel = require("../model/conversation.model");
const { convertToObjectId } = require("../utils");
const userInfoModel = require("../model/userInfo.model");
const { findMessageById } = require("./message.repo");

const findConversationById = async ({ senderId, receiverId }) => {
  const conversation = await conversationModel
    .findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    })
    .populate({
      path: "participants",
      select: "displayName",
    })
    .lean();
  if (!conversation) return null;
  conversation.participants = conversation.participants.filter(
    (participant) => participant._id.toString() !== senderId.toString()
  );
  let user = await userInfoModel.findOne({
    user_id: conversation.participants[0]._id,
  });
  conversation.participants[0].avatar = user.avatar;
  //get last message
  if (conversation.messages.length > 0) {
    const lastIndex = conversation?.messages?.length - 1;
    conversation.lastMessage = await findMessageById(
      conversation?.messages[lastIndex]?._id
    );
  }
  return conversation;
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
    .populate("messages", [], null, { sort: { createdAt: -1 } })
    .populate("lastMessage")
    .lean();
};

const pushMessageToConversation = async ({ conversationId, messageId }) => {
  conversationId = convertToObjectId(conversationId);
  messageId = convertToObjectId(messageId);
  return conversationModel.findByIdAndUpdate(conversationId, {
    $push: {
      messages: messageId,
    },
    $inc: {
      score: 1,
      unReadCount: 1,
    },
    lastMessage: messageId,
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
    .populate("lastMessage")
    .sort({ updatedAt: -1 })
    .limit(10)
    .lean();
  await Promise.all(
    allConversation.map(async (conversation) => {
      conversation.participants = conversation.participants.filter(
        (participant) => participant._id.toString() !== userId.toString()
      );
      let user = await userInfoModel.findOne({
        user_id: conversation.participants[0]._id,
      });
      conversation.participants[0].avatar =
        user.avatar === "" ? "" : user.avatar;
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

const setReadedMessage = async ({ conversationId }) => {
  conversationId = convertToObjectId(conversationId);
  return conversationModel.findByIdAndUpdate(
    {
      _id: conversationId,
    },
    {
      $set: {
        unReadCount: 0,
      },
    }
  );
};

const readMessageFromConversation = async ({ conversationId }) => {
  conversationId = convertToObjectId(conversationId);
  return conversationModel.findByIdAndUpdate(
    {
      _id: conversationId,
    },
    {
      $set: {
        unReadCount: 0,
      },
    }
  );
}
module.exports = {
  findConversationById,
  createConversation,
  getMessageFromConversation,
  pushMessageToConversation,
  findUserHasConversation,
  getAllAvatar,
  setReadedMessage,
  readMessageFromConversation
};
