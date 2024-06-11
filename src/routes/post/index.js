const express = require("express");
const router = express.Router();
const { authentication } = require("../../auth/authentication");
const asyncHandler = require("express-async-handler");
const postController = require("../../controller/postController");
const  uploadCloud  = require("../../config/multer.config");

router.get("/:id", asyncHandler(postController.searchPostsByTag));

router.get("/user/:id", asyncHandler(postController.searchPostsByUserId));

router.get("/:id", asyncHandler(postController.getAPost));

router.get("/", asyncHandler(postController.getPosts));
//router.get('/getallpost', asyncHandler(postcontroller.getAllPost));

// Authen
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

module.exports = router;
