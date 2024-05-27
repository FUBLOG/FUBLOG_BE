"use strict";

const { model } = require("mongoose");
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
}
module.exports = new MessageController();
