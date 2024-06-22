"use strict";
const friendRequestModel = require("../model/friend.request.model");
const { convertToObjectId } = require("../utils");

const findRequest = async (sourceID, targetID) => {
  return await friendRequestModel
    .findOne({
      sourceID: convertToObjectId(sourceID),
      targetID: convertToObjectId(targetID),
    })
    .lean();
};

const createRequest = async (sourceID, targetID) => {
  return await friendRequestModel.create({ sourceID, targetID });
};

const deleteRequest = async (sourceID, targetID) => {
  return await friendRequestModel.findOneAndDelete({ sourceID, targetID });
};

const findAllRequests = async (userID) => {
  return await friendRequestModel
    .find({
      targetID: convertToObjectId(userID),
    })
    .populate({
      path: "sourceID",
      select: "displayName profileHash",
      populate: {
        path: "userInfo",
        select: "avatar",
      },
    })
    .sort({ createdAt: -1 })
    .lean();
};
const findForSocket = async (sourceID, targetID) => {
  return await friendRequestModel
    .findOne({ sourceID, targetID })
    .populate({
      path: "sourceID",
      select: "displayName profileHash",
      populate: {
        path: "userInfo",
        select: "avatar",
      },
    })
    .lean();
};

module.exports = {
  findRequest,
  createRequest,
  deleteRequest,
  findAllRequests,
  findForSocket,
};
