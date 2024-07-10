const express = require("express");
const router = express.Router();
const { authentication } = require("../../auth/authentication");
const asyncHandler = require("express-async-handler");
const postController = require("../../controller/post.controller");
const likeController = require("../../controller/like.controller");
const uploadCloud = require("../../config/multer.config");

router.get("/user/:id", asyncHandler(postController.searchPostsByUserId));
router.get("/guest/:id", asyncHandler(postController.searchPostsByTagForGuest));

router.get("/:id", asyncHandler(postController.getAPost));

router.use(authentication);

router.post(
  "",
  uploadCloud.array("image"),
  asyncHandler(postController.newPost)
);

router.patch(
  "/:id",
  uploadCloud.array("image"),
  asyncHandler(postController.updatePost)
);

router.delete("/:id", asyncHandler(postController.deletePost));

router.get("/all", asyncHandler(postController.getAllPost));

router.post("/like", asyncHandler(likeController.like));
router.post("/unlike", asyncHandler(likeController.unlike));
router.get("/getLiked", asyncHandler(likeController.getLiked));

module.exports = router;
