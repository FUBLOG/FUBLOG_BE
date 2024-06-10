const express = require('express')
const Router = express.Router()
const asyncHandler = require('express-async-handler');
const postTagController = require('../../controller/postTagController');


Router.post('/createposttag', asyncHandler(postTagController.newTag));

Router.get('/getaposttag/:id',asyncHandler(postTagController.viewATag));

Router.get('/getallposttag', asyncHandler(postTagController.viewAllTag));

Router.patch('/updateposttag/:id',asyncHandler(postTagController.updateTag));

Router.delete('/deleteposttag/:id', asyncHandler(postTagController.deleteTag));

module.exports = Router;