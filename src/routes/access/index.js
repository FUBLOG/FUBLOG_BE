"use strict";
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const accessController = require("../../controller/access.controller");
const { authentication } = require("../../auth/authentication");

router.get("/verifyToken", asyncHandler(accessController.signupWithEmailToken));
router.post("/login", asyncHandler(accessController.login));
router.post("/refreshToken", asyncHandler(accessController.handleRefreshToken));
router.post("/forgotPassword", asyncHandler(accessController.forgotPassword));
router.get("/validateToken", asyncHandler(accessController.validateToken));
router.use(authentication);
router.get("/logout", asyncHandler(accessController.logout));
module.exports = router;
