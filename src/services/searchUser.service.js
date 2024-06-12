// searchUser.service.js
const User = require('../model/user.model');
const UserInfo = require('../model/userInfo.model');

const search = async (keywolds) => {
  try {
    const users = await User.find({ keywolds }).select("displayName")

    await Promise.all(
      users.map(async(user,index) => {
        let userInfor = await UserInfo.findOne({
          user_id:user._id
        })

        users[index].qqqq = userInfor.avatar
        console.log("2");
      })
    )
    
    console.log("1");
    return users;
  } catch (error) {
    throw new Error(`Error while searching users: ${error.message}`);
  }
};

module.exports = {
  search
};
