"use strict";
const accessService = require("../services/access.service");
const { CREATED, OK } = require("../core/response/success.response");
const { HEADER } = require("../core/constans/header.constant");
class AccessController {
  login = async (req, res, next) => {
    const response = new OK({
      message: "Login successfully",
      metadata: await accessService.login(req.body),
    });
    response.send(res);
  };

  logout = async (req, res, next) => {
    const profileHash = req.headers[HEADER.CLIENT_ID];
    const response = new OK({
      message: "Logout successfully",
      metadata: await accessService.logout(profileHash),
    });
    response.send(res);
  };

  signupWithEmailToken = async (req, res, next) => {
    const response = new CREATED({
      message: "Signup successfully , please redirect to login page",
      metadata: await accessService.signupWithMailVerify(req.query.token),
    });
    response.send(res);
  };

  forgotPassword = async (req, res, next) => {
    res.send("Forgot Password");
  };

  changePassword = async (req, res, next) => {
    res.send("Change Password");
  };
}
module.exports = new AccessController();
