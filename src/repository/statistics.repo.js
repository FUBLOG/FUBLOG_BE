// server/repositories/userRepository.js
const User = require('../model/user.model');
const UserInfo = require('../model/userInfo.model');
const Post = require('../model/post.model'); // Giả sử có model Post

const getTotalUser = async () => {
  return await User.countDocuments();
};

const getActUsers = async (startDay, endDay) => {
  return await UserInfo.distinct('user_id', {
    updatedAt: {
      $gte: startDay,
      $lt: endDay
    }
  });
};

const getTotalPost = async () => {
  return await Post.countDocuments();
};

const getPostInDay = async (startDay, endDay) => {
  return await Post.countDocuments({
    createdAt: {
      $gte: startDay,
      $lt: endDay
    }
  });
};

const getUserInDay = async (startDay, endDay) => {
  return await User.countDocuments({
    createdAt: {
      $gte: startDay,
      $lt: endDay
    }
  });
};

module.exports = {
   getTotalUser,
   getActUsers,
   getTotalPost,
   getPostInDay,
   getUserInDay
};
