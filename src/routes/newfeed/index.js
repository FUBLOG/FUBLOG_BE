const express = require("express");
const router = express.Router();
const { authentication } = require("../../auth/authentication");
const asyncHandler = require("express-async-handler");
const postController = require("../../controller/post.controller");

router.get("/guest", asyncHandler(postController.getPostForGuest));
router.get("/tag/:id", asyncHandler(postController.searchPostsByTag));
router.use(authentication);

router.get("/user", asyncHandler(postController.getPostForUser));

module.exports = router;
