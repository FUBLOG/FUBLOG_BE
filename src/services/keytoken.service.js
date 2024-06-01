"use strict";

const {
  createNewKeyToken,
  deleteKeyToken,
  findUserById,
  updateKeyToken,
} = require("../repository/keyToken.repo");

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    profileHash,
    refreshToken,
    publicKey,
  }) => {
    return await createNewKeyToken({
      userId,
      profileHash,
      refreshToken,
      publicKey,
    });
  };

  static deleteKeyToken = async (profileHash) => {
    return await deleteKeyToken(profileHash);
  };

  static findUserById = async (profileHash) => {
    return await findUserById(profileHash);
  };

  static updateKeyToken = async (
    profileHash,
    refreshTokenUsed,
    refreshToken
  ) => {
    return await updateKeyToken(profileHash, refreshTokenUsed, refreshToken);
  };
}
module.exports = KeyTokenService;
