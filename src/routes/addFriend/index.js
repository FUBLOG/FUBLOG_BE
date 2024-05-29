const express = require('express');
const router = express.Router();
const addFriendController = require("../../controller/addFriend.controller");
const asyncHandler = require("express-async-handler");

router.post('/send', asyncHandler(addFriendController.sendFriendRequest));

router.post('/accept', asyncHandler(addFriendController.acceptFriendRequest));

router.post('/decline', asyncHandler(addFriendController.declineFriendRequest));

router.get('/getAll', asyncHandler(addFriendController.getAllFriendRequests));

module.exports = router;
