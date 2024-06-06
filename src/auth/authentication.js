"use strict";
const asyncHandler = require("express-async-handler");
const KeyTokenService = require("../services/keytoken.service");
const { HEADER } = require("../core/constans/header.constant");
const CryptoService = require("../services/crypto.service");
const {
  NotFoundError,
  UnauthorizedError,
} = require("../core/response/error.response");

/*
      1 - check profileHash missing
      2 - get access token
      3 - verify access token
      4 - check user in db
      6 - return next
      */

const authentication = asyncHandler(async (req, res, next) => {
  const profileHash = req.headers[HEADER.CLIENT_ID];
  if (!profileHash) throw new UnauthorizedError("Invalid request");
  const keyStore = await KeyTokenService.findUserById(profileHash);
  if (!keyStore) throw new NotFoundError("Invalid request");
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) {
    throw new UnauthorizedError("Invalid request");
  } else {
    let decodeUser = {};
    const jwt = accessToken.split(" ")[1];
    decodeUser = await CryptoService.verifyToken(
      jwt,
      keyStore.publicKey,
      (err, user) => {
        if (err && err.name === "TokenExpiredError") {
          throw new UnauthorizedError("JWT invalid");
        }
        if (err) {
          throw new UnauthorizedError("Invalid request");
        }
        return user;
      }
    );
    if (profileHash !== decodeUser.profileHash) {
      throw new UnauthorizedError("Invalid request");
    }
    req.keyStore = keyStore;
    req.user = decodeUser;
    // decodeUser = { userId: '60f0d9f6b7d2b9e3d8d9f5f0', profileHash: 'kaidophan' }
    return next();
  }
});
module.exports = { authentication };
