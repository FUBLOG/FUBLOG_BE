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
    const profileHash = req.user.profileHash;
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
  handleRefreshToken = async (req, res, next) => {
    const response = new OK({
      message: "Refresh token updated successfully",
      metadata: await accessService.handleRefreshToken(req.headers),
    });
    response.send(res);
  };

  validateToken = async (req, res, next) => {
    const { token = "" } = req.query;
    const response = new OK({
      message: "Token is valid",
      metadata: await accessService.checkOtp({ token }),
    });
    response.send(res);
  };

  forgotPassword = async (req, res, next) => {
    const email = req.body.email;
    const response = new OK({
      message: "Send email forgot password successfully",
      metadata: await accessService.forgotPassword({ email }),
    });
    response.send(res);
  };

  resetPassword = async (req, res, next) => {
    const { password = "", confirmPassword = "", otp = "" } = req.body;
    const response = new OK({
      message: "Reset password successfully",
      metadata: await accessService.resetPassword({
        password,
        confirmPassword,
        token: otp,
      }),
    });
    response.send(res);
  };

  changePassword = async (req, res, next) => {
    const { password = "", confirmPassword = "", oldPassword = "" } = req.body;
    const userId = req.user.userId;
    const response = new OK({
      message: "Change password successfully",
      metadata: await accessService.changePassword({
        password,
        confirmPassword,
        oldPassword,
        userId,
      }),
    });
    response.send(res);
  };

  checkToken = async (req, res, next) => {
    const response = new OK({
      message: "user is valid",
      metadata: await accessService.checkToken(req.headers),
    });
    response.send(res);
  };
}
module.exports = new AccessController();
