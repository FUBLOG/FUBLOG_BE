"use strict";
const { randomInt } = require("crypto");
const { createOTP } = require("../repository/otp.repo");
class OTPService {
  generateTokenRandom = async () => {
    const token = randomInt(0, Math.pow(2, 32)).toString();
    return token;
  };
  generateOTP = async ({ email, token, sign }) => {
    const newOtp = await createOTP({ email, token, sign });
    return newOtp;
  };

}
module.exports = new OTPService();
