const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const searchController = require("../../controller/searchMess.controller");

router.post("/search", asyncHandler(searchController.searchUser));

module.exports = router;
