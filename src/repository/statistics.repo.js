const User = require('../model/user.model');
const Post = require('../model/post.model'); 

const getUserCountByMonth = async (startDay, endDay) => {
  return await User.countDocuments({
    createdAt: {
      $gte: startDay,
      $lt: endDay
    }
  });
};

const getPostCountByMonth = async (startDay, endDay) => {
  return await Post.countDocuments({
    createdAt: {
      $gte: startDay,
      $lt: endDay
    }
  });
};

module.exports = {
  getUserCountByMonth,
  getPostCountByMonth
};
