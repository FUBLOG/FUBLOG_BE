const express = require('express');
const router = express.Router();
const addFriendController = require("../../controller/addFriend.controller");

router.post('/send', addFriendController.sendFriendRequest);

router.post('/accept', addFriendController.acceptFriendRequest);

router.post('/decline', addFriendController.declineFriendRequest);

router.get('/getAll', addFriendController.getAllFriendRequests);

module.exports = router;
