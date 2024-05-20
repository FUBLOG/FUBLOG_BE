const express = require("express");
const router = express.Router();
const {createPost,getAllPost,getAPost,UpdateAPost,deletePost} = require("../controller/postController");

router.get('/', getAllPost);

router.get('/:id', getAPost);

router.post('/', createPost);

router.put('/:id', UpdateAPost);

router.delete('/:id', deletePost);

module.exports = router;
