"use strict";

const { OK } = require("../core/response/success.response");
const messageService = require("../services/message.service");
const userService = require("../services/user.service");

class UserController {
  createUserWithEmail = async (req, res, next) => {
    const result = new OK({
      message: "Send Email Verification successfully",
      metadata: await userService.createUserToken(req.body),
    });
    result.send(res);
  };

  getUserMessages = async (req, res, next) => {
    const response = new OK({
      message: "Get user messages successfully",
      metadata: await messageService.getListConversation(req),
    });
    response.send(res);
  };
}
module.exports = new UserController();
