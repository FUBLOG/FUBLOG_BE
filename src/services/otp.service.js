"use strict";
const { randomInt } = require("crypto");
const { createOTP } = require("../repository/otp.repo");
class OTPService {
  generateTokenRandom = async () => {
    const token = randomInt(0, Math.pow(2, 32)).toString();
    return token;
  };
  generateOTP = async ({ email }) => {
    const token = await this.generateTokenRandom();
    const newOtp = await createOTP({ email, token });
    return newOtp.otp_token;
  };
}
module.exports = new OTPService();
