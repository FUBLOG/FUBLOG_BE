const { OK } = require("../core/response/success.response");
const userInfoService = require("../services/userInfo.service");

class UserInfoController {
  updateInfo = async (req, res, next) => {
    const userId = req.user.userId;
    const result = new OK({
      message: "Update Info Success",
      metadata: await userInfoService.updateUserInfo(userId, req.body),
    });
    result.send(res);
  };

  changeAvatar = async (req, res, next) => {
    //const userId = req.user.userId;
    console.log(req);
    const result = new OK({
      message: "Change Avatar Success",
      metadata: await userInfoService.updateAvatar(userId, req.file),
    });
    result.send(res);
  };
  changeCoverPhoto = async (req, res, next) => {
    const userId = req.user.userId;
    const result = new OK({
      message: "Change Cover Photo Success",
      metadata: await userInfoService.updateCoverPhoto(userId, req.file),
    });
    result.send(res);
  };

  getUserInfo = async (req, res, next) => {
    const result = new OK({
      message: "Get User Info Success",
      metadata: await userInfoService.getInfoUser(req.params.profileHash),
    });
    result.send(res);
  };
}
module.exports = new UserInfoController();
