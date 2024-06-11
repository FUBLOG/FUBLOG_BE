"use strict";
const newfeedModel = require("../model/newfeeds.model");

const createNewFeed = async ({ userId, friendId, content }) => {
  return await newfeedModel.create({ userId, friendId, post: content });
};

module.exports = {
  createNewFeed,
};
