"use strict";

const { OK, CREATED } = require("../core/response/success.response");
const messageService = require("../services/message.service");

class MessageController {
  sendMessage = async (req, res) => {
    const response = new CREATED({
      message: "Message sent successfully",
      metadata: await messageService.sendMessage(req),
    });
    response.send(res);
  };

  getMessage = async (req, res) => {
    const response = new OK({
      message: "Messages fetched successfully",
      metadata: await messageService.getMessage(req),
    });
    response.send(res);
  };

  getConversation = async (req, res) => {
    const userId = req.user.userId;
    const friendId = req.params.friendId;
    const response = new OK({
      message: "Conversation fetched successfully",
      metadata: await messageService.getConversation({ userId, friendId }),
    });
    response.send(res);
  };
}
module.exports = new MessageController();
