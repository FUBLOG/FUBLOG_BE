"use strict";
const userInfoModel = require("../model/userInfo.model");
const { convertToObjectId } = require("../utils");

const createDefaultUserInfo = async ({ userId }) => {
  return await userInfoModel.create({
    user_id: userId,
  });
};

const updateUserAvatar = async (id, fileData) => {
  // Move old avatar to avatarlist
  const oldAvatar = await userInfoModel.findById(id).avatar;
  const arrayOfAvatar = (await userInfoModel.findById(id).avatarList) || [];
  const newAvatar = fileData.path;
  // update new avatar
  return await userInfoModel.findByIdAndUpdate(id, {
    avatar: newAvatar,
    avatarList: arrayOfAvatar.push(oldAvatar),
  });
};

const updateUserCVPhoto = async (id, fileData) => {
  // Clear old avatar
  const oldCVPhoto = userInfoModel.findById(id).cover_photo;
  const arrayOfCVPhoto = (await userInfoModel.findById(id).coverList) || [];
  const newCVPhoto = fileData.path;

  // update new avatar
  return await userInfoModel.findByIdAndUpdate(id, {
    cover_photo: newCVPhoto,
    coverList: arrayOfCVPhoto.push(oldCVPhoto),
  });
};

//  View all Photos Post
// const viewAllPhotos = async (userid) => {
//   const posts = postService.findPostByUserId(userid);
//   const arrayOfImage = posts.map((image) => image.postLinkToImages) || [];
//   return arrayOfImage;
// };

//  View old Avatar
const viewAvatars = async (_id) => {
  const usersInfo = userInfoModel.find({ user_id: _id });
  const arrayOfAvatars = usersInfo.map((user) => user.avatarList) || [];
  return arrayOfAvatars;
};

// View old cover photos
const viewCvPhotos = async (_id) => {
  const usersInfo = userInfoModel.find({ user_id: _id });
  const arrayOfCvPhotos = usersInfo.map((user) => user.coverList) || [];
  return arrayOfCvPhotos;
};

const findUserInfoById = async (userId, unselect = []) => {
  return await userInfoModel.findOne({ user_id: userId }).select(unselect);
};

const getFriendsList = async (userId) => {
  return await userInfoModel
    .findOne({ user_id: userId })
    .select("friendList")
    .populate({
      path: "friendList",
      select: "displayName profileHash",
      populate: {
        path: "userInfo",
        select: "avatar",
      },
    })
    .lean();
};

const updateUserInfo = async (userId, data) => {
  return await userInfoModel.findOneAndUpdate({ user_id: userId }, data, {
    new: true,
  });
};

const updateFriendList = async (userId, friendId) => {
  return await userInfoModel.findOneAndUpdate(
    {
      user_id: userId,
    },
    {
      $push: {
        friendList: friendId,
      },
    },
    {
      new: true,
    }
  );
};

const updateBlockList = async (userId, friendId) => {
  return await userInfoModel.findOneAndUpdate(
    {
      user_id: userId,
    },
    {
      $push: {
        blockList: friendId,
      },
    },
    {
      new: true,
    }
  );
};

const unfriend = async (userId, friendId) => {
  return await userInfoModel.findOneAndUpdate(
    {
      user_id: userId,
    },
    {
      $pull: {
        friendList: friendId,
      },
    },
    {
      new: true,
    }
  );
};

const unBlock = async (userId, friendId) => {
  return await userInfoModel.findOneAndUpdate(
    {
      user_id: userId,
    },
    {
      $pull: {
        blockList: friendId,
      },
    },
    {
      new: true,
    }
  );
};

const checkFriend = async (userId, friendId) => {
  return await userInfoModel.findOne({
    user_id: userId,
    friendList: {
      $in: [convertToObjectId(friendId)],
    },
  });
};

const getBlockedUsers = async (userId) => {
  return await userInfoModel
    .findOne({ user_id: userId })
    .select("blockList")
    .populate({
      path: "blockList",
      select: "displayName profileHash",
      populate: {
        path: "userInfo",
        select: "avatar",
      },
    })
    .lean();
};

const isExisProfileHash = async (profileHash) => {
  return await userInfoModel.findOne({ profileHash });
};
module.exports = {
  createDefaultUserInfo,
  updateUserAvatar,
  updateUserCVPhoto,
  viewAvatars,
  viewCvPhotos,
  findUserInfoById,
  getFriendsList,
  updateUserInfo,
  updateFriendList,
  unfriend,
  updateBlockList,
  unBlock,
  checkFriend,
  getBlockedUsers,
  isExisProfileHash,
};
