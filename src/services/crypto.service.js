"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
class CryptoService {
  static generateRandomString = async (length = 32) => {
    return crypto.randomBytes(length).toString("hex");
  };
  static generateHash = async (data) => {
    return crypto.createHash("sha256").update(data).digest("hex");
  };
  static generateToken = async (payload, secret, options) => {
    return jwt.sign(payload, secret, options);
  };
  static verifyToken = async (token, secret) => {
    return jwt.verify(token, secret);
  };
  static hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
  };
  static comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
  };
  static generateKeyPair = async () => {
    return crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });
  };
  static generateTokenByRSA = async (payload, privateKey, options) => {
    const accessToken = jwt.sign(payload, privateKey, {
      ...options,
      expiresIn: "3d",
    });
    const refreshToken = jwt.sign(payload, privateKey, {
      ...options,
      expiresIn: "7d",
    });
    return { accessToken, refreshToken };
  };
  static verifyTokenByRSA = async (token, publicKey) => {
    return jwt.verify(token, publicKey);
  };
}
module.exports = CryptoService;
