"use strict";
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const userController = require("../../controller/user.controller");

router.post("/newUser", asyncHandler(userController.newUser));

module.exports = router;
