const logSystem = require("../logger/log.system");
const User = require("../model/user.model");
const UserInfo = require("../model/userInfo.model");
const {BadRequestError,NotFoundError} = require ("../core/response/error.response")
const { removeAccents } = require("../utils");

const search = async (keywords, userProfileHash) => {
  
if (!keywords) {
  throw new BadRequestError("Empty search string");
}   

  const regexSearch = new RegExp(removeAccents(keywords), "i");

  let users = await User.find({
    searchable: {
      $regex: regexSearch,
    },
  }).select("displayName profileHash");

 
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

  users = users.filter(user => user.profileHash !== userProfileHash);
  if(users.length == 0){
    throw new NotFoundError("User not found")
  }
  return users;
};

module.exports = {
  search,
};
