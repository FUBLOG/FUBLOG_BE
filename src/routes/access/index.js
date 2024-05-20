"use strict";
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const accessController = require("../../controller/access.controller");

router.post("/login", asyncHandler(accessController.login));
router.get("/logout", asyncHandler(accessController.logout));
router.post("/signup", asyncHandler(accessController.signup));
router.post("/forgot-password", asyncHandler(accessController.forgotPassword));
router.post("/change-password", asyncHandler(accessController.changePassword));

module.exports = router;
