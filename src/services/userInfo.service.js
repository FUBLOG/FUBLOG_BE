"use strict";
const userInfoModel = require("../model/userInfo.model");
const Validator = require("../core/validator");
const { NotFoundError, BadRequestError} = require("../core/response/error.response");
const { isUserIDExist, } = require("../repository/user.repo");
const { updateUserAvatar } = require("../repository/userInfo.repo");

class UserInfoService {
  getInfoUser = async (_id) => {
    // if(Validator.isEmpty(_id))
    //   throw new NotFoundError("ID Is Empty")
    
    if(!(await isUserIDExist(_id)))
      throw new NotFoundError("ID Not Found")
    return await userInfoModel.findOne({ user_id: _id });
  };

  // Show all Profile
  findAllUser = async() => {
    const findAll = await userInfoModel.find();
    if(findAll.length === 0)
      throw new NotFoundError("Empty List of User");
    return findAll;
  }
  // Update Profile
  updateUserInfo = async(_id, data) =>{
    if(await Validator.isEmpty(_id))
      throw new NotFoundError("ID Is Empty")
    
    return await userInfoModel.findByIdAndUpdate(_id,data)
  }

  // Update Avartar
  updateAvatar = async(_id,filedata) => {
    if(await Validator.isEmpty(_id))
      throw new NotFoundError("ID Is Empty")
    return await updateUserAvatar(_id,filedata)
  }
  // Update COver Photo
  updateCoverPhoto = async(_id,filedata) => {
    if(await Validator.isEmpty(_id))
      throw new NotFoundError("ID Is Empty")
    return await updateUserCVPhoto(_id,filedata)
  }
  //  View post photo
  viewPhotos = async(_userId)=>{
    if(!await isUserIDExist(_userId))
      throw new NotFoundError("Id is not exists")
     return await viewAllPhotos(_userId)
  }

  deleteUserInfo = async(_userId) => {
    if(!await isUserIDExist(_userId))
      throw new NotFoundError("Id is not exists")
    const userInfoId = userInfoModel.find({_userId})._id ;
     return await userInfoModel.findByIdAndDelete(userInfoId)
  }
}
module.exports = new UserInfoService();
