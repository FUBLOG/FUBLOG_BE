const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const searchController = require("../../controller/search.controller");

router.get("/search", asyncHandler(searchController.searchUser));

module.exports = router;
