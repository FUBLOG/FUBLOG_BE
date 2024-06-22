const logSystem = require("../logger/log.system");
const User = require("../model/user.model");
const UserInfo = require("../model/userInfo.model");
const {BadRequestError,NotFoundError} = require ("../core/response/error.response")
const { removeAccents } = require("../utils");

class searchService{
  static searchUser = async (keywords) => {
  
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
    
    //  users = users.filter(user => user.profileHash !== userProfileHash);
      if(users.length == 0){
        return []
      }
      return users;
    };

    static searchMess = async (keywords) => {
      const search = removeAccents(keywords).trim(); 
    
      if (!search) {
        throw new BadRequestError("Empty search string");
      }
    
      const regexSearch = new RegExp(search, "i");
    
      let userInfos = await UserInfo.find({
        friendList: { $exists: true, $not: { $size: 0 } }
      }).populate({
        path: "friendList",
        match: {
          $or: [
            { displayName: { $regex: regexSearch } },
            { firstName: { $regex: regexSearch } },
            { lastName: { $regex: regexSearch } }
          ]
        },
        select: "displayName profileHash",
        populate: {
          path: "userInfo",
          select: "avatar",
          model: "UserInfo"
        }
      });
    
      let users = userInfos.reduce((acc, userInfo) => {
        userInfo.friendList.forEach((friend) => {
          
          if (
            friend.displayName.match(regexSearch) ||
            (friend.firstName && friend.firstName.match(regexSearch)) ||
            (friend.lastName && friend.lastName.match(regexSearch))
          ) {
            acc.push({
              _id: friend._id,
              displayName: friend.displayName,
              profileHash: friend.profileHash,
              avatar: friend.userInfo ? (friend.userInfo.avatar || "") : "", 
              friendCount: userInfo.friendList.length
            });
          }
        });
        return acc;
      }, []);
    
     // users = users.filter(user => user.profileHash !== userProfileHash);
      if(users.length == 0){
        return []
      }
      return users;
    };
    
}


module.exports = searchService;