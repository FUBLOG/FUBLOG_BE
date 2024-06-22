// searchUser.route.js
const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const searchController = require("../../controller/search.controller");

router.post("/user", asyncHandler(searchController.searchUser));

module.exports = router;
