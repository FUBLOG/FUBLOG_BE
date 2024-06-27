"use strict";
const {
  isEmailExists,
  createNewUser,
  updatePassword,
  findUserById,
  findUserDetailById,
} = require("../repository/user.repo");
const {
  ConflictRequestError,
  UnprocessableEntityError,
} = require("../core/response/error.response");
const emailService = require("./email.service");
const CryptoService = require("./crypto.service");
const otpService = require("./otp.service");
const { extractUserProfileFromEmail } = require("../utils");
const {
  createDefaultUserInfo,
  isExisProfileHash,
} = require("../repository/userInfo.repo");
const validator = require("../core/validator");
class UserService {
  createUserToken = async ({
    email = "",
    captcha = null,
    password = "",
    firstName = "",
    lastName = "",
    dateOfBirth = "",
    sex = "",
  }) => {
    const result = await validator.isEmptyObject({
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      sex,
    });
    if (result.length > 0)
      throw new UnprocessableEntityError(`Missing ${result}`);
    const isEmail = await validator.isEmail(email);
    if (!isEmail) throw new UnprocessableEntityError("Invalid email");
    email = email.toLowerCase();
    const emailExists = await isEmailExists({ email });
    if (emailExists) throw new ConflictRequestError("Email already exists");
    const otp = await otpService.generateTokenRandom();
    //hash data
    const passwordHash = await CryptoService.hashPassword(password);

    const sign = await CryptoService.generateToken(
      {
        email: email,
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
    emailService.sendEmailVerify({ email, otp });
    return {};
  };

  createNewUser = async ({
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    sex,
  }) => {
    let profileHash = await extractUserProfileFromEmail(email);
    const exist = await isExisProfileHash(profileHash);
    if (exist) {
      profileHash = `${profileHash}${Math.floor(Math.random() * 1000)}`;
    }
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

  resetPassword = async ({
    newPassword = "",
    confirmPassword = "",
    email = "",
  }) => {
    const result = await validator.isEmptyObject({
      newPassword,
      confirmPassword,
      email,
    });
    if (result.length > 0)
      throw new UnprocessableEntityError(`Missing ${result}`);
    const isEmail = await validator.isEmail(email);
    if (!isEmail) throw new UnprocessableEntityError("Invalid email");
    if (newPassword !== confirmPassword)
      throw new UnprocessableEntityError("Password not match");
    const passwordHash = await CryptoService.hashPassword(newPassword);
    const user = await isEmailExists({ email });
    if (!user) throw new ConflictRequestError("Email not exists");
    await updatePassword({ email, password: passwordHash });
    return {};
  };

  updatePassword = async (email, password) => {
    const passwordHash = await CryptoService.hashPassword(password);
    await updatePassword({ email, password: passwordHash });
  };

  findUserById = async (id) => {
    return await findUserDetailById(id);
  };
}
module.exports = new UserService();
