"use strict";

const userModel = require("../model/user.model");

const isEmailExists = async ({ email = null }) => {
  return await userModel.findOne({ email }).lean();
};
const isUserIDExist = async (userID) => {
  return await userModel.findOne({ _id: userID }).lean();
};
const createNewUser = async ({
  email,
  password,
  firstName,
  lastName,
  dateOfBirth,
  sex,
  profileHash,
}) => {
  const displayName = `${firstName} ${lastName}`;
  return await userModel.create({
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    sex,
    profileHash,
    displayName,
  });
};

module.exports = {
  isEmailExists,
  createNewUser,
  isUserIDExist,
};
