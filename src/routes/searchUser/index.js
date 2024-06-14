// searchUser.route.js
const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const searchController = require("../../controller/searchUser.controller");

router.get("/search", asyncHandler(searchController.searchUser));

module.exports = router;
