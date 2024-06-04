const Router = require("express").Router();
const uploader = require("../../config/cloudiany.config");
const asyncHandler = require('express-async-handler');
const userInfoController = require("../../controller/user.info.controller");
const { authentication } = require("../../auth/authentication");


// Get All User Info
Router.get('/getalluserinfo', asyncHandler(userInfoController.getAllUserInfo));

// Get one User Info
Router.get('/getuserinfo/:id', asyncHandler(userInfoController.getUserInfo));

Router.use(authentication);
// Delete a user info
Router.delete('/deleteuserinfo/:id', asyncHandler(userInfoController.deleteUserInfo));

// Update user info
Router.patch('/updateuserinfo/:id', asyncHandler(userInfoController.updateInfo));

// Update Avatar
Router.patch('/updateavatar/:id',uploader.single('image'), asyncHandler(userInfoController.changeAvatar));

// Update Cover Photo
Router.patch('/updatecoverphoto',uploader.single('image'), asyncHandler(userInfoController.changeCoverPhoto));

module.exports = Router 