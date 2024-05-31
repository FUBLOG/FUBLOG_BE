const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const postcontroller = require("../../controller/postController");
const uploader = require("../../config/cloudiany.config")




router.post('/createpost',uploader.array('image'), asyncHandler(postcontroller.newPost));

router.get('/getapost/:id',asyncHandler(postcontroller.getAPost));

router.get('/getallpost', asyncHandler(postcontroller.getAllPost));

router.patch('/updateapost/:id', asyncHandler(postcontroller.updatePost));

router.delete('/deletepost/:id', asyncHandler(postcontroller.deletePost));

router.get('/findPostByTag/:id', asyncHandler(postcontroller.searchPostsByTag));

router.get('/findPostByUser/:id', asyncHandler(postcontroller.searchPostsByUserId));


module.exports = router;
