"use strict";
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { authentication } = require("../../auth/authentication");
const notificationController = require("../../controller/notification.controller");

router.use(authentication);
router.get("", asyncHandler(notificationController.getAllNotifications));
router.get(
  "/:notificationId",
  asyncHandler(notificationController.updateStatusRead)
);

module.exports = router;
