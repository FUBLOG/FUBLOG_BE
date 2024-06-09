"use strict";
const userInfoModel = require("../model/userInfo.model");
const validator = require("../core/validator");
const {
  NotFoundError,
  BadRequestError,
  UnprocessableEntityError,
} = require("../core/response/error.response");
const {
  isUserIDExist,
  findUserByProfileHash,
} = require("../repository/user.repo");
const {
  updateUserAvatar,
  findUserInfoById,
} = require("../repository/userInfo.repo");
const { getInfoData, unGetSelectData } = require("../utils");

class UserInfoService {
  getInfoUser = async (profileHash = "") => {
    const isEmpty = await validator.isEmpty(profileHash);
    if (isEmpty) throw new UnprocessableEntityError("Missing profileHash");
    const user = await findUserByProfileHash(profileHash);
    if (!user) throw new NotFoundError("User not found");
    const info = await findUserInfoById(
      user._id,
      unGetSelectData(["_id", "user_id", "__v"])
    );
    return {
      user: getInfoData({
        filed: ["displayName", "dateOfBirth", "sex", "profileHash"],
        object: user,
      }),
      info,
    };
  };

  // Show all Profile
  findAllUser = async () => {
    const findAll = await userInfoModel.find();
    if (findAll.length === 0) throw new NotFoundError("Empty List of User");
    return findAll;
  };
  // Update Profile
  updateUserInfo = async (_id, data) => {
    if (await Validator.isEmpty(_id)) throw new NotFoundError("ID Is Empty");

    return await userInfoModel.findByIdAndUpdate(_id, data);
  };

  // Update Avartar
  updateAvatar = async (_id, filedata) => {
    if (await Validator.isEmpty(_id)) throw new NotFoundError("ID Is Empty");
    return await updateUserAvatar(_id, filedata);
  };
  // Update COver Photo
  updateCoverPhoto = async (_id, filedata) => {
    if (await Validator.isEmpty(_id)) throw new NotFoundError("ID Is Empty");
    return await updateUserCVPhoto(_id, filedata);
  };
  //  View post photo
  viewPhotos = async (_userId) => {
    if (!(await isUserIDExist(_userId)))
      throw new NotFoundError("Id is not exists");
    return await viewAllPhotos(_userId);
  };

  deleteUserInfo = async (_userId) => {
    if (!(await isUserIDExist(_userId)))
      throw new NotFoundError("Id is not exists");
    const userInfoId = userInfoModel.find({ _userId })._id;
    return await userInfoModel.findByIdAndDelete(userInfoId);
  };
}
module.exports = new UserInfoService();
