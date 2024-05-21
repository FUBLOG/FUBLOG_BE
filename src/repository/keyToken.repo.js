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

module.exports = {
  createNewKeyToken,
  deleteKeyToken,
};
