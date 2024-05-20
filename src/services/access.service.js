"use strict";

class AccessService {
  login = async (req, res, next) => {
    res.send("Login");
  };
  logout = async (req, res, next) => {
    res.send("Logout");
  };
  signup = async ({
    
  }) => {
  };
  forgotPassword = async (req, res, next) => {
    res.send("Forgot Password");
  };
  changePassword = async (req, res, next) => {
    res.send("Change Password");
  };
}
module.exports = new AccessService();
