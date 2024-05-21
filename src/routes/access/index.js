"use strict";
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const accessController = require("../../controller/access.controller");

router.get("/verifyToken", asyncHandler(accessController.signupWithEmailToken));
router.post("/login", asyncHandler(accessController.login));
router.get("/logout", asyncHandler(accessController.logout));
module.exports = router;
