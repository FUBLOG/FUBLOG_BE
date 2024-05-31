const Router = require("express").Router();
const uploader = require("../../config/cloudiany.config");
const userInfoController = require("../../controller/user.info.controller");

// Get All User Info
Router.get('/getalluserinfo', userInfoController.getAllUserInfo);

// Get one User Info
Router.get('/getuserinfo/:id', userInfoController.getUserInfo);

// Delete a user info
Router.delete('/deleteuserinfo/:id', userInfoController.deleteUserInfo);

// Update user info
Router.patch('/updateuserinfo/:id', userInfoController.updateInfo);

// Update Avatar
Router.patch('/updateavatar/:id', userInfoController.changeAvatar);

// Update Cover Photo
Router.patch('/updatecoverphoto', userInfoController.changeCoverPhoto);