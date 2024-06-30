"use strict";

const express = require("express");
const router = express.Router();
const friendController = require("../../controller/friend.controller");
const asyncHandler = require("express-async-handler");
const { authentication } = require("../../auth/authentication");

router.get("/profile/:profileHash",asyncHandler(friendController.getFriendProfile));

router.use(authentication);

router.post("/send", asyncHandler(friendController.sendFriendRequest));

router.post("/accept", asyncHandler(friendController.acceptFriendRequest));

router.post("/decline", asyncHandler(friendController.declineFriendRequest));

router.post("/unFriend", asyncHandler(friendController.unFriend));

router.get("/request", asyncHandler(friendController.getAllFriendRequests));

router.post("/block", asyncHandler(friendController.block));

router.post("/unblock", asyncHandler(friendController.unblock));

router.get("/block", asyncHandler(friendController.getBlockedUsers));

router.get("", asyncHandler(friendController.getFriends));

router.get(
  "/request/:targetID",
  asyncHandler(friendController.getRequestFriend)
);

router.delete(
  "/request",
  asyncHandler(friendController.deleteRequest)
);
module.exports = router;
