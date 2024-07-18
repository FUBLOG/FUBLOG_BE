const router = require("express").Router();
const asyncHandler = require('express-async-handler');
const userInfoController = require("../../controller/user.info.controller");
const { authentication } = require("../../auth/authentication");
const uploader = require("../../config/multer.config")

// Get All User Info
router.get('/getalluserinfo', asyncHandler(userInfoController.getAllUserInfo));

// Get one User Info
router.get('/getuserinfo/:id', asyncHandler(userInfoController.getUserInfo));

router.use(authentication);
// Delete a user info
router.delete('/deleteuserinfo/:id', asyncHandler(userInfoController.deleteUserInfo));

// Update user info
router.patch('/updateuserinfo/:id', asyncHandler(userInfoController.updateInfo));

// Update Avatar
router.patch('/updateavatar/',uploader.single('image'), asyncHandler(userInfoController.changeAvatar));

// Update Cover Photo
router.patch('/updatecoverphoto',uploader.single('image'), asyncHandler(userInfoController.changeCoverPhoto));

// Update Bio
module.exports = router 