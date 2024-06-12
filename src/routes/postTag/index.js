const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler');
const postTagController = require('../../controller/postTagController');


router.post('/createposttag', asyncHandler(postTagController.newTag));

router.get('/getaposttag/:id',asyncHandler(postTagController.viewATag));

router.get('/getallposttag', asyncHandler(postTagController.viewAllTag));

router.patch('/updateposttag/:id',asyncHandler(postTagController.updateTag));

router.delete('/deleteposttag/:id', asyncHandler(postTagController.deleteTag));

module.exports = router;
