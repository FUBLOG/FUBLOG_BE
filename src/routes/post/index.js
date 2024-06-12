const express = require("express");
const router = express.Router();
const postController = require("../../controller/postController");
const { authentication } = require("../../auth/authentication");
const asyncHandler = require("express-async-handler");
const postcontroller = require("../../controller/postController");
const uploader = require("../../config/cloudiany.config")

router.get('/findPostByTag/:id', asyncHandler(postcontroller.searchPostsByTag));

router.get('/findPostByUser/:id', asyncHandler(postcontroller.searchPostsByUserId));

router.get('/getPost/:id',asyncHandler(postcontroller.getAPost));

router.get('/getAllPosts', asyncHandler(postcontroller.getAllPost));



// Authen
router.use(authentication);
router.post('/createPost',uploader.array('image'), asyncHandler(postcontroller.newPost));

router.patch('/updatePost/:id', uploader.array('image'),asyncHandler(postcontroller.updatePost));

router.delete('/deletePost/:id', asyncHandler(postcontroller.deletePost));






module.exports = router;
