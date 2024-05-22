const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const postcontroller = require("../controller/postController");
const uploader = require("../config/cloudiany.config")

router.post('/createpost', asyncHandler(postcontroller.newpost));

router.get('/:id',asyncHandler(postcontroller.getApost));

router.get('/', asyncHandler(postcontroller.getallpost));

router.put('/:id', asyncHandler(postcontroller.updatePost));

router.delete('/:id', asyncHandler(postcontroller.deletePost));

router.post('/uploadimage', uploader.single('image'))
module.exports = router;
