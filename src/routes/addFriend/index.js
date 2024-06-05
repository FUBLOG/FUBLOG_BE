"use strict";

const express = require("express");
const router = express.Router();
const addFriendController = require("../../controller/addFriend.controller");
const asyncHandler = require("express-async-handler");
const {authentication} = require("../../auth/authentication")

router.use(authentication);

router.post('/send', asyncHandler(addFriendController.sendFriendRequest));

router.post('/accept', asyncHandler(addFriendController.acceptFriendRequest));

router.delete('/decline', asyncHandler(addFriendController.declineFriendRequest));

router.delete('/unFriend', asyncHandler(addFriendController.unFriend));

router.get('/getAll', asyncHandler(addFriendController.getAllFriendRequests));

router.delete('/block', asyncHandler(addFriendController.block));

module.exports = router;
