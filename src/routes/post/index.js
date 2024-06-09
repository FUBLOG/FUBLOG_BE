const express = require("express");
const router = express.Router();
const postController = require("../../controller/postController");
const { authentication } = require("../../auth/authentication");
const asyncHandler = require("express-async-handler");
const postcontroller = require("../../controller/postController");
const uploader = require("../../config/cloudiany.config")

router.get('/findPostByTag/:id', asyncHandler(postcontroller.searchPostsByTag));

router.get('/findPostByUser/:id', asyncHandler(postcontroller.searchPostsByUserId));

router.get('/getapost/:id',asyncHandler(postcontroller.getAPost));

router.get('/getallpost', asyncHandler(postcontroller.getAllPost));



// Authen
router.use(authentication);
router.post('/createpost',uploader.array('image'), asyncHandler(postcontroller.newPost));

router.patch('/updateapost/:id', uploader.array('image'),asyncHandler(postcontroller.updatePost));

router.delete('/deletepost/:id', asyncHandler(postcontroller.deletePost));






module.exports = router;
