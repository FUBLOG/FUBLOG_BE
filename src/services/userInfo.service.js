"use strict";
const userInfoModel = require("../model/userInfo.model");
class UserInfoService {
  getInfoUser = async (_id) => {
    return userInfoModel.findOne({ user_id: _id });
  };
}
module.exports = new UserInfoService();

