"use strict";

const userModel = require("../model/user.model");
const { isEmailExists, createNewUser } = require("../repository/user.repo");
const { ConflictRequestError } = require("../core/response/error.response");
const emailService = require("./email.service");
const CryptoService = require("./crypto.service");
const otpService = require("./otp.service");
const { extractUserProfileFromEmail } = require("../utils");
const { createDefaultUserInfo } = require("../repository/userInfo.repo");

class UserService {
  createUserToken = async ({
    email,
    captcha = null,
    password,
    firstName,
    lastName,
    dateOfBirth,
    sex,
  }) => {
    const emailExists = await isEmailExists({ email });
    if (emailExists) throw new ConflictRequestError("Email already exists");
    const otp = await otpService.generateTokenRandom();
    //hash data
    const passwordHash = await CryptoService.hashPassword(password);
    const sign = await CryptoService.generateToken(
      {
        email,
        password: passwordHash,
        firstName,
        lastName,
        dateOfBirth,
        sex,
      },
      otp
    );
    //store data in db
    await otpService.generateOTP({
      email,
      token: otp,
      sign,
    });
    //send email
    const mailResponse = await emailService.sendEmailVerify({ email, otp });
    return mailResponse;
  };

  createNewUser = async ({
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    sex,
  }) => {
    const profileHash = extractUserProfileFromEmail(email);
    if (!profileHash) throw new Error("Validation error: Invalid email");
    const newUser = await createNewUser({
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      sex,
      profileHash,
    });
    createDefaultUserInfo({ userId: newUser._id });
    return newUser;
  };
}
module.exports = new UserService();
