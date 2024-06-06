"use strict";
const userInfoModel = require("../model/userInfo.model");
const postService = require("../services/post.service");
const createDefaultUserInfo = async ({ userId }) => {
  return await userInfoModel.create({

    user_id: userId,
  });
};
const updateUserAvatar = async(id,fileData)=>{
  // Move old avatar to avatarlist
  const oldAvatar = await userInfoModel.findById(id).avatar
  const arrayOfAvatar = await userInfoModel.findById(id).avatarList || [];
  const newAvatar = fileData.path;
  // update new avatar
  return await userInfoModel.findByIdAndUpdate(id,{
    avatar: newAvatar,
    avatarList: arrayOfAvatar.push(oldAvatar) })
}
const updateUserCVPhoto =  async(id,fileData)=>{
  // Clear old avatar
  const oldCVPhoto = userInfoModel.findById(id).cover_photo;
  const arrayOfCVPhoto = await userInfoModel.findById(id).coverList || [];
  const newCVPhoto = fileData.path;

  // update new avatar
  return await userInfoModel.findByIdAndUpdate(id,{
    cover_photo: newCVPhoto,
    coverList: arrayOfCVPhoto.push(oldCVPhoto)})
}
//  View all Photos Post
const viewAllPhotos= async(userid) =>{
  const posts = postService.findPostByUserId(userid);
  const arrayOfImage = posts.map(image => image.postLinkToImages) || [];
  return arrayOfImage;
} 
//  View old Avatar
const viewAvatars = async(_id) => {
  const usersInfo = userInfoModel.find({user_id : _id}) ;
  const arrayOfAvatars = usersInfo.map(user => user.avatarList) || [];
  return arrayOfAvatars;
}
// View old cover photos
const viewCvPhotos = async(_id) => {
  const usersInfo = userInfoModel.find({user_id : _id}) ;
  const arrayOfCvPhotos = usersInfo.map(user => user.coverList) || [];
  return arrayOfCvPhotos;
}
module.exports = {
  createDefaultUserInfo,
  updateUserAvatar,
  updateUserCVPhoto,
  viewAllPhotos,
  viewAvatars,
  viewCvPhotos,
};
