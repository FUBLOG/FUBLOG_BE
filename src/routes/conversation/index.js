"use strict";
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { authentication } = require("../../auth/authentication");
const messageController = require("../../controller/message.controller");

router.use(authentication);

router.get(
  "/:friendId",
  asyncHandler(messageController.getConversation)
);


module.exports = router;
