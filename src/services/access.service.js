"use strict";

const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  UnprocessableEntityError,
} = require("../core/response/error.response");
const { findByToken, findAndDeleteOTP } = require("../repository/otp.repo");
const { isEmailExists } = require("../repository/user.repo");
const CryptoService = require("./crypto.service");
const userService = require("./user.service");
const KeyTokenService = require("./keytoken.service");
const { getInfoData } = require("../utils");
const userInfoService = require("./userInfo.service");
const { HEADER } = require("../core/constans/header.constant");
const validator = require("../core/validator");
class AccessService {
  login = async ({ email = "", password = "" }) => {
    const result = await validator.isEmptyObject({
      email,
      password,
    });
    if (result.length > 0)
      throw new UnprocessableEntityError(`Missing ${result}`);
    const isEmail = await validator.isEmail(email);
    if (!isEmail) throw new UnprocessableEntityError("Invalid email");
    const existUser = await isEmailExists({ email });
    // Check if user exists
    if (!existUser) throw new NotFoundError("Authentication failed");
    // Check if password is correct
    const matchPassword = await CryptoService.comparePassword(
      password,
      existUser.password
    );
    if (!matchPassword) throw new UnauthorizedError("Authentication failed");
    // Generate token
    const { publicKey, privateKey } = await CryptoService.generateKeyPair();
    const tokens = await CryptoService.generateTokenByRSA(
      { userId: existUser._id, profileHash: existUser.profileHash },
      privateKey,
      { algorithm: "RS256" }
    );
    await KeyTokenService.createKeyToken({
      userId: existUser._id,
      profileHash: existUser.profileHash,
      refreshToken: tokens.refreshToken,
      publicKey,
    });
    const info = await userInfoService.getInfoUser(existUser._id);
    return {
      user: getInfoData({
        filed: ["profileHash", "displayName"],
        object: existUser,
      }),
      info: getInfoData({
        filed: ["avatar"],
        object: info,
      }),
      tokens: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        privateKey,
      },
    };
  };

  logout = async (profileHash) => {
    if (!profileHash) throw new UnauthorizedError("Invalid request");
    const delKeyToken = await KeyTokenService.deleteKeyToken(profileHash);
    if (!delKeyToken) throw new NotFoundError("Logout failed");
    return null;
  };

  signupWithMailVerify = async (token) => {
    if (!token) throw new BadRequestError("Token is required");
    const otp = await findByToken({ token });
    if (!otp) throw new NotFoundError("Token is not found");
    const data = await CryptoService.verifyToken(otp.otp_sign, otp.otp_token);
    //delete token
    await findAndDeleteOTP({ token });
    await userService.createNewUser(data);
    return null;
  };

  forgotPassword = async (req, res, next) => {
    res.send("Forgot Password");
  };

  changePassword = async (req, res, next) => {
    res.send("Change Password");
  };

  handleRefreshToken = async (headers) => {
    const profileHash = headers[HEADER.CLIENT_ID];
    const refreshToken = headers[HEADER.REFRESH_TOKEN];
    if (!profileHash || !refreshToken)
      throw new NotFoundError("Invalid request");
    const keyStore = await KeyTokenService.findUserById(profileHash);
    try {
      const decodeUser = await CryptoService.verifyTokenByRSA(
        refreshToken,
        keyStore.publicKey
      );
      if (profileHash !== decodeUser.profileHash)
        throw new AuthFailureError("Invalid request");
    } catch (e) {
      throw new AuthFailureError("Invalid request");
    }
    const privateKey = req.headers[HEADER.PRIVATE_KEY];
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await CryptoService.generateTokenByRSA(decodeUser, privateKey, {
        algorithm: "RS256",
      });
    await KeyTokenService.updateKeyToken(
      decodeUser.profileHash,
      refreshToken,
      newRefreshToken
    );
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  };
}
module.exports = new AccessService();
