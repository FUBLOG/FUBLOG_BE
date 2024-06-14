"use strict";
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
  updateUserInfo,
} = require("../repository/userInfo.repo");
const { unGetSelectData } = require("../utils");

class UserInfoService {
  getInfoUser = async (profileHash) => {
    if (await validator.isEmpty(profileHash))
      throw new UnprocessableEntityError("Profile Hash is Empty");
    const user = await findUserByProfileHash(
      profileHash,
      unGetSelectData([
        "__v",
        "email",
        "password",
        "status",
        "createdAt",
        "updatedAt",
        "searchable",
        "profileHash",
      ])
    );
    if (user === null) throw new NotFoundError("User Not Found");
    const info = await findUserInfoById(
      user._id,
      unGetSelectData(["_id", "user_id", "__v"])
    );
    return {
      user,
      info,
    };
  };

  updateUserInfo = async (userId, data) => {
    return await updateUserInfo(userId, data);
  };

  updateAvatar = async (userId, filedata) => {
    return await updateUserAvatar(userId, filedata);
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
}
module.exports = new UserInfoService();
