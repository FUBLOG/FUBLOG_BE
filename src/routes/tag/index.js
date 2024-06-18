const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler');
const postTagController = require('../../controller/post.tag.controller');


router.post('/createTag', asyncHandler(postTagController.newTag));

router.get('/getTag/:id',asyncHandler(postTagController.viewATag));

router.get('/getAllTag', asyncHandler(postTagController.viewAllTag));

router.patch('/updateTag/:id',asyncHandler(postTagController.updateTag));

router.delete('/deleteTag/:id', asyncHandler(postTagController.deleteTag));

module.exports = router;