const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPost,
  getAPost,
  UpdateAPost,
  deletePost,
} = require("../../controller/postController");
const { authentication } = require("../../auth/authentication");

router.get("/", getAllPost);

router.get("/:id", getAPost);

router.use(authentication);
router.post("/", createPost);

router.put("/:id", UpdateAPost);

router.delete("/:id", deletePost);

module.exports = router;
