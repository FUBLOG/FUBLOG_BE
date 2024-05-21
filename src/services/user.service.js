"use strict";

const userModel = require("../model/user.model");
const { isEmailExists } = require("../repository/user.repo");
const { ConflictRequestError } = require("../core/response/error.response");
const emailService = require("./email.service");

class UserService {
  createNewUser = async ({ email = null, captcha = null }) => {
    const emailExists = await isEmailExists({ email });
    if (emailExists) throw new ConflictRequestError("Email already exists");
    const mailResponse = await emailService.sendEmail({ email });
    return mailResponse;
  };
}
module.exports = new UserService();
