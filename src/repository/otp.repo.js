"use strict";
const { model } = require("mongoose");
const otpModel = require("../model/otp.model");

const createOTP = async ({ email = null, token = null }) => {
  console.log(token);

  const newOtp = await otpModel.create({ otp_email: email, otp_token: token });
  console.log(newOtp);
  return newOtp;
};

module.exports = {
  createOTP,
};
