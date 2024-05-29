"use strict";
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const accessController = require("../../controller/access.controller");
const { authentication } = require("../../auth/authentication");

router.get("/verifyToken", asyncHandler(accessController.signupWithEmailToken));
router.post("/login", asyncHandler(accessController.login));
router.post("/refreshToken", asyncHandler(accessController.handleRefreshToken));
<<<<<<< HEAD

=======
>>>>>>> da87c34db838cea6c561f762b0beb0c6a0eff9a5
router.use(authentication);
router.get("/logout", asyncHandler(accessController.logout));
module.exports = router;
