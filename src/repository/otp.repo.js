"use strict";
const otpModel = require("../model/otp.model");

const createOTP = async ({ email = null, token = null, sign = null }) => {
  const newOtp = await otpModel.create({
    otp_email: email,
    otp_token: token,
    otp_sign: sign,
  });
  return newOtp;
};
const findByToken = async ({ token = null }) => {
  return await otpModel.findOne({ otp_token: token }).lean();
};
const findAndDeleteOTP = async ({ token }) => {
  return await otpModel.findOneAndDelete({ otp_token: token });
};
module.exports = {
  createOTP,
  findByToken,
  findAndDeleteOTP,
};
