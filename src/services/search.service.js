const logSystem = require("../logger/log.system");
const User = require("../model/user.model");
const UserInfo = require("../model/userInfo.model");
const { removeAccents } = require("../utils");

const search = async (keywords) => {
  try {
    const regexSearch = new RegExp(removeAccents(keywords), "i");

    let users = await User.find({
      searchable: {
        $regex: regexSearch,
      },
    }).select("displayName profileHash");

    console.log(users);

    await Promise.all(
      users.map(async (user, index) => {
        let info = await UserInfo.findOne({
          user_id: user._id,
        });

        const friendCount = info.friendList ? info.friendList.length : 0;

        users[index] = {
          _id: user._id,
          displayName: user.displayName,
          profileHash: user.profileHash,
          avatar: info.avatar,
          friendCount: friendCount,  
        };
      })
    ).catch((e) => {
      console.log(e);
    });

    return users;
  } catch (error) {
    throw new Error(`Error while searching users: ${error.message}`);
  }
};

module.exports = {
  search,
};
