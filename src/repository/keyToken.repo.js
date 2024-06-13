"use strict";
const keyTokenModel = require("../model/keyToken.model");
const createNewKeyToken = async ({
  userId,
  profileHash,
  refreshToken,
  publicKey,
}) => {
  return keyTokenModel.findOneAndUpdate(
    { user: userId },
    { profileHash, publicKey, refreshTokenUsed: [], refreshToken },
    { upsert: true, new: true }
  );
};

const deleteKeyToken = async (profileHash) => {
  return keyTokenModel.findOneAndDelete({ profileHash });
};

const findUserById = async (profileHash) => {
  return keyTokenModel.findOne({ profileHash });
};

const updateKeyToken = async (profileHash, refreshTokenUsed, refreshToken) => {
  return keyTokenModel.findOneAndUpdate(
    { profileHash },
    {
      $push: { refreshTokenUsed: refreshTokenUsed },
      refreshToken: refreshToken,
      a,
    }
  );
};
module.exports = {
  createNewKeyToken,
  deleteKeyToken,
  findUserById,
  updateKeyToken,
};
