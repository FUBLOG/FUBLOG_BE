"use strict";

const messageModel = require("../model/message.model");

const createNewMessage = async ({ message, senderId, receiverId }) => {
  return messageModel.create({
    message,
    senderId,
    receiverId,
  });
};

const findMessageById = async (messageId) => {
  return await messageModel.findOne({ _id: messageId }).lean();
};

module.exports = {
  createNewMessage,
  findMessageById,
};
