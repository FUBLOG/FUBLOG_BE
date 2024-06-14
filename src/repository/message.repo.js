"use strict";

const messageModel = require("../model/message.model");

const createNewMessage = async ({ message, senderId, receiverId }) => {
  return messageModel.create({
    message,
    senderId,
    receiverId,
  });
};

module.exports = {
  createNewMessage,
};
