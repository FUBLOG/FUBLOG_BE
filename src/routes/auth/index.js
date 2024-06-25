const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const accessController = require("../../controller/access.controller");

router.get("/checkToken", asyncHandler(accessController.checkToken));
router.post("/forgotPassword", asyncHandler(accessController.forgotPassword));
router.post("/resetPassword", asyncHandler(accessController.resetPassword));
module.exports = router;
