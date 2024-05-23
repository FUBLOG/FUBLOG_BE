"use strict";
const userInfoModel = require("../model/userInfo.model");
const createDefaultUserInfo = async ({ userId }) => {
  return await userInfoModel.create({
    user_id: userId,
  });
};
module.exports = {
  createDefaultUserInfo,
};
