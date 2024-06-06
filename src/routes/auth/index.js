const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const accessController = require("../../controller/access.controller");
router.get("/checkToken", asyncHandler(accessController.checkToken));

module.exports = router;
