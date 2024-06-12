const { OK } = require("../core/response/success.response");
const userInfoService = require("../services/userInfo.service");

class userInfoController{
    updateInfo = async(req, res, next)=> {
        const result = new OK({
            message: "Update Info Success",
            metadata: await userInfoService.updateUserInfo(req.params.id,req.body)
        })
        result.send(res);
    };

    changeAvatar = async(req, res, next)=> {
        const result = new OK({
            message: "Change Avatar Success",
            metadata: await userInfoService.updateAvatar(req.params.id,req.file)
        })
        result.send(res);
    };
    changeCoverPhoto = async(req, res, next)=> {
        const result = new OK({
            message: "Change Cover Photo Success",
            metadata: await userInfoService.updateCoverPhoto(req.params.id,req.file)
        })
        result.send(res);
    };
    getUserInfo = async(req, res, next)=> {
        const result = new OK({
            message: "Get User Info Success",
            metadata: await userInfoService.getInfoUser(req.params.id)
        })
        result.send(res);
    };

    getAllUserInfo = async(req, res, next)=> {
        const result = new OK({
            message: "Get all User Info Success",
            metadata: await userInfoService.findAllUser()
        })
        result.send(res);
    };

    deleteUserInfo = async(req, res, next)=> {
        const result = new OK({
            message: "Delete UserInfo Success",
            metadata: await userInfoService.deleteUserInfo(req.body.user_id)
        })
        result.send(res);
    };
    
}
module.exports = new userInfoController();