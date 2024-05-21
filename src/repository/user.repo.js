"use strict";

const userModel = require("../model/user.model");

const isEmailExists = async ({ email = null }) => {
  const emailExists = await userModel.findOne({ email }).lean();
  if (emailExists) {
    return true;
  }
  return false;
};

module.exports = {
  isEmailExists,
};
