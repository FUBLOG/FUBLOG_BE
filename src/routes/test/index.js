"use strict";
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const testController = require("../../controller/test.controller");

router.post("/templateEmail", asyncHandler(testController.newTem));

module.exports = router;
