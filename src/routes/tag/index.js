const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const postTagController = require("../../controller/post.tag.controller");

router.post("", asyncHandler(postTagController.newTag));

router.get("/:id", asyncHandler(postTagController.viewATag));

router.get("", asyncHandler(postTagController.viewAllTag));

router.patch("/:id", asyncHandler(postTagController.updateTag));

router.delete("/:id", asyncHandler(postTagController.deleteTag));

module.exports = router;
