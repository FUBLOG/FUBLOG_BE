const router = require("express").Router();
const uploader = require("../../config/cloudiany.config");
const asyncHandler = require('express-async-handler');
const userInfoController = require("../../controller/user.info.controller");
const { authentication } = require("../../auth/authentication");


// Get All User Info
router.get('/getAllUserInfors', asyncHandler(userInfoController.getAllUserInfo));

// Get one User Info
router.get('/getUserInfor/:id', asyncHandler(userInfoController.getUserInfo));

router.use(authentication);
// Delete a user info
router.delete('/deleteUserInfor/:id', asyncHandler(userInfoController.deleteUserInfo));

// Update user info
router.patch('/updateUserInfor/:id', asyncHandler(userInfoController.updateInfo));

// Update Avatar
router.patch('/updateAvata/:id',uploader.single('image'), asyncHandler(userInfoController.changeAvatar));

// Update Cover Photo
router.patch('/updateCoverPhoto',uploader.single('image'), asyncHandler(userInfoController.changeCoverPhoto));

module.exports = router 