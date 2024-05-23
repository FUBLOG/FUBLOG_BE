"use strict";

const { OK } = require("../core/response/success.response");
const userService = require("../services/user.service");

class UserController {
  createUserWithEmail = async (req, res, next) => {
    const result = new OK({
      message: "Send Email Verification successfully",
      metadata: await userService.createUserToken(req.body),
    });
    result.send(res);
  };
}
module.exports = new UserController();
