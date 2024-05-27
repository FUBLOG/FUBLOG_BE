const express = require("express");
const router = express.Router();
const postController = require("../../controller/postController");
const { authentication } = require("../../auth/authentication");
const asyncHandler = require("express-async-handler");
const postcontroller = require("../../controller/postController");
const uploader = require("../../config/cloudiany.config")

router.get("/",postController.getallpost);
router.post('/createpost',uploader.array('image'), asyncHandler(postcontroller.newpost));

router.get("/:id", postController.getApost);
router.get('/:id',asyncHandler(postcontroller.getApost));

router.use(authentication);

router.post("/", postController.newpost);
router.get('/', asyncHandler(postcontroller.getallpost));

router.put("/:id", postController.updatePost);
router.put('/:id', asyncHandler(postcontroller.updatePost));

router.delete('/:id', asyncHandler(postcontroller.deletePost));

module.exports = router;
