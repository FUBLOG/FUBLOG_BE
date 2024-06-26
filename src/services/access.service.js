"use strict";
const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  UnprocessableEntityError,
  ConflictRequestError,
} = require("../core/response/error.response");
const {
  findByToken,
  findAndDeleteOTP,
  createOTP,
} = require("../repository/otp.repo");
const { isEmailExists, findUserById } = require("../repository/user.repo");
const CryptoService = require("./crypto.service");
const userService = require("./user.service");
const KeyTokenService = require("./keytoken.service");
const { HEADER } = require("../core/constans/header.constant");
const validator = require("../core/validator");
const emailService = require("./email.service");
const otpService = require("./otp.service");
const { io } = require("../config/socket.config");
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
    const existUser = await isEmailExists({ email:email.toLowerCase() });
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
    const user = await userService.findUserById(existUser._id);
    return {
      user,
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
    if (!token) throw new UnprocessableEntityError("Missing token");
    const otp = await findByToken({ token });
    if (!otp) throw new NotFoundError("Token is not found");
    const data = await CryptoService.verifyToken(
      otp.otp_sign,
      otp.otp_token,
      (err, user) => {
        if (err) {
          throw new UnauthorizedError("Invalid request");
        }
        return user;
      }
    );
    await findAndDeleteOTP({ token });
    await userService.createNewUser(data);
    io.emit(`${data.email}`, "Signup successfully");
    return null;
  };

  forgotPassword = async ({ email = "" }) => {
    const isEmpty = await validator.isEmpty(email);
    if (isEmpty) throw new UnprocessableEntityError(`Missing ${result}`);
    const isEmail = await validator.isEmail(email);
    if (!isEmail) throw new UnprocessableEntityError("Invalid email");
    const existUser = await isEmailExists({ email });
    if (!existUser) throw new NotFoundError("User not found");
    const otp = await otpService.generateTokenRandom();
    const sign = await CryptoService.generateToken({ email }, otp);
    await createOTP({ email, token: otp, sign });
    // Send email
    await emailService.sendEmailForgotPassword({ email, otp });
    return null;
  };

  resetPassword = async ({ password, token, confirmPassword }) => {
    const result = await validator.isEmptyObject({
      password,
      token,
      confirmPassword,
    });
    if (result.length > 0)
      throw new UnprocessableEntityError(`Missing ${result}`);
    if (password !== confirmPassword)
      throw new UnprocessableEntityError("Password not match");

    const data = await this.validateToken({ token });
    await userService.updatePassword(data.email, password);
    io.emit(`${data.email}`, "Reset password successfully");
    return null;
  };

  changePassword = async ({
    password,
    confirmPassword,
    oldPassword,
    userId,
  }) => {
    const result = await validator.isEmptyObject({
      password,
      confirmPassword,
      oldPassword,
    });
    if (result.length > 0)
      throw new UnprocessableEntityError(`Missing ${result}`);
    if (password !== confirmPassword)
      throw new UnprocessableEntityError("New Password not match");
    const user = await findUserById(userId);
    if (!user) throw new NotFoundError("User not found");
    const matchPassword = await CryptoService.comparePassword(
      oldPassword,
      user.password
    );
    if (!matchPassword) throw new ConflictRequestError("Authentication failed");
    await userService.updatePassword(user.email, password);
    return null;
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

  validateToken = async ({ token = "" }) => {
    const otp = await findByToken({ token });
    if (!otp) throw new NotFoundError("Token is not found");
    return true;
  };

  checkToken = async (headers) => {
    const profileHash = headers[HEADER.CLIENT_ID];
    const accessToken = headers[HEADER.AUTHORIZATION];
    if (!profileHash || !accessToken)
      throw new UnauthorizedError("Invalid request");
    const keyStore = await KeyTokenService.findUserById(profileHash);
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
          console.log(err);
          throw new UnauthorizedError("Invalid request");
        }
        return user;
      }
    );
    if (profileHash !== decodeUser.profileHash)
      throw new UnauthorizedError("Invalid request");
    const user = await userService.findUserById(decodeUser.userId);
    return user;
  };
}
module.exports = new AccessService();
