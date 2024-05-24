const express = require("express");
const router = express.Router();
const postController = require("../../controller/postController");
const { authentication } = require("../../auth/authentication");

router.get("/",postController.getallpost);

router.get("/:id", postController.getApost);

router.use(authentication);

router.post("/", postController.newpost);

router.put("/:id", postController.updatePost);

router.delete("/:id", postController.deletePost);

module.exports = router;
