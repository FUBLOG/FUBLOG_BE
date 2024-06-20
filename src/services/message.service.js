"use strict";
const { getReceiverSocketId, io } = require("../config/socket.config");
const { UnprocessableEntityError } = require("../core/response/error.response");
const validator = require("../core/validator");
const {
  findConversationById,
  createConversation,
  getMessageFromConversation,
  pushMessageToConversation,
  findUserHasConversation,
} = require("../repository/conversation.repo");
const { createNewMessage } = require("../repository/message.repo");
class MessageService {
  sendMessage = async (req) => {
    const { message = "" } = req.body;
    const isEmpty = await validator.isEmpty(message);
    if (isEmpty) throw new UnprocessableEntityError("Missing message");
    const { id: receiverId } = req.params;
    const senderId = req.user.userId;

    let conversation = await findConversationById({
      senderId,
      receiverId,
    });
    if (!conversation) {
      conversation = await createConversation({ senderId, receiverId });
    } else {
      const newMessage = await createNewMessage({
        message,
        senderId,
        receiverId,
      });
      if (newMessage) {
        await pushMessageToConversation({
          conversationId: conversation._id,
          messageId: newMessage._id,
        });
      }

      const receiverSocketId = getReceiverSocketId(receiverId);

      if (receiverSocketId) {
        // io.to(<socket_id>).emit() used to send events to specific client
        io.to(receiverSocketId).emit("newMessage", newMessage);
        if (conversation?.messages.length === 0) {
          io.to(receiverSocketId).emit("newConversation", conversation);
        }
      }
      return newMessage;
    }
  };

  getMessage = async (req) => {
    const { id: userToChatId } = req.params;
    const senderId = req.user.userId;
    const conversation = await getMessageFromConversation({
      senderId,
      userToChatId,
    });
    if (!conversation) return [];
    return conversation.messages;
  };

  getListConversation = async (req) => {
    return await findUserHasConversation({ userId: req.user.userId });

  };

  getConversation = async ({ userId = "", friendId = "" }) => {
    const conversation = await findConversationById({
      senderId: userId,
      receiverId: friendId,
    });
    if (!conversation) {
      return null;
    }
    return conversation;
  };
}

module.exports = new MessageService();
