const User = require('../model/user.model');
const UserInfo = require('../model/userInfo.model');
const Post = require('../model/post.model');

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

const getMonUser = async (startMonth, endMonth) => {
  return await User.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startMonth,
          $lte: endMonth
        }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1
      }
    }
  ]);
};

const getMonPost = async (startMonth, endMonth) => {
  return await Post.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startMonth,
          $lte: endMonth
        }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1
      }
    }
  ]);
};

module.exports = {
  getTotalUser,
  getActUsers,
  getTotalPost,
  getPostInDay,
  getUserInDay,
  getMonUser,
  getMonPost
};
