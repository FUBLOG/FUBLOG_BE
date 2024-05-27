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
<<<<<<< HEAD
    return await updateKeyToken(
      profileHash,
      refreshTokenUsed,
      refreshToken
    );
=======
    return await updateKeyToken(profileHash, refreshTokenUsed, refreshToken);
>>>>>>> da87c34db838cea6c561f762b0beb0c6a0eff9a5
  };
}
module.exports = KeyTokenService;
