const express = require("express");
const router = express.Router();
const { authentication } = require("../../auth/authentication");
const asyncHandler = require("express-async-handler");
const postTagController = require("../../controller/post.tag.controller");
const postController = require("../../controller/post.controller");
router.post("", asyncHandler(postTagController.newTag));

router.get("/:id", asyncHandler(postTagController.viewATag));

router.get("", asyncHandler(postTagController.viewAllTag));

router.patch("/:id", asyncHandler(postTagController.updateTag));

router.delete("/:id", asyncHandler(postTagController.deleteTag));

router.get("/guest/:id", asyncHandler(postController.searchPostsByTagForGuest));

router.use(authentication);

router.get("/user/:id", asyncHandler(postController.searchPostsByUserId));
module.exports = router;
