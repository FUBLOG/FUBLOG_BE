"use strict";

const {
  createNewKeyToken,
  deleteKeyToken,
} = require("../repository/keyToken.repo");

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    profileHash,
    refreshToken,
    publicKey,
  }) => {
    console.log(
      "userId",
      userId,
      "profileHash",
      profileHash,
      "refreshToken",
      refreshToken,
      "publicKey",
      publicKey
    );
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
}
module.exports = KeyTokenService;
