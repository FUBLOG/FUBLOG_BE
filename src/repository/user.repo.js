"use strict";

const { path } = require("../app");
const userModel = require("../model/user.model");
const { removeAccents } = require("../utils");
const { getFriendsList } = require("./userInfo.repo");

const isEmailExists = async ({ email = null }) => {
  return await userModel.findOne({ email }).lean();
};

const isUserIDExist = async (userID) => {
  return await userModel.findOne({ _id: userID }).lean();
};

const createNewUser = async ({
  email,
  password,
  firstName,
  lastName,
  dateOfBirth,
  sex,
  profileHash,
}) => {
  const displayName = `${firstName} ${lastName}`;
  const searchable = removeAccents(displayName);
  return await userModel.create({
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    sex,
    profileHash,
    displayName,
    searchable,
  });
};

const updatePassword = async ({ email, password }) => {
  return await userModel.findOneAndUpdate({ email }, { password });
};

const findUserById = async (userId) => {
  return await userModel.findOne({ _id: userId }).lean();
};
const findUserByProfileHash = async (profileHash, unselect = []) => {
  return await userModel.findOne({ profileHash }).select(unselect).lean();
};
const findUserDetailById = async (userId) => {
  return await userModel
    .findOne({ _id: userId })
    .select("-password -__v -createdAt -updatedAt -status")
    .populate("userInfo", {
      avatar: 1,
      friendList: 1,
      blockList: 1,
      user_id: 0,
      _id: 0,
    })
    .lean();
};
const getFriendListByProfileHash = async (profileHash) => {
  const user = await userModel.findOne({ profileHash });
  const friend =  await getFriendsList(user._id);
  return friend?.friendList;
};

module.exports = {
  isEmailExists,
  createNewUser,
  isUserIDExist,
  updatePassword,
  findUserById,
  findUserByProfileHash,
  findUserDetailById,
  getFriendListByProfileHash,
};
