"use strict";
const accessService = require("../services/access.service");
const { CREATED, OK } = require("../core/response/success.response");
class AccessController {
  login = async (req, res, next) => {
    res.send("Login");
  };
  logout = async (req, res, next) => {
    res.send("Logout");
  };
  signup = async (req, res, next) => {
   
  };
  verifyEmail = async (req, res, next) => {
    
  };
  verifyOTP = async (req, res, next) => {

  };
  forgotPassword = async (req, res, next) => {
    res.send("Forgot Password");
  };
  changePassword = async (req, res, next) => {
    res.send("Change Password");
  };
}
module.exports = new AccessController();
