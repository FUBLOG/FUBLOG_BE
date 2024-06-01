"use strict";
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const userController = require("../../controller/user.controller");
const { authentication } = require("../../auth/authentication");

router.post("/newUser", asyncHandler(userController.createUserWithEmail));

router.use(authentication);
router.get("/getUserMessages", asyncHandler(userController.getUserMessages));
module.exports = router;
