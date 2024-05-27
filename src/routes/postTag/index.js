const express = require('express')
const Router = express.Router()
const asyncHandler = require('express-async-handler');
const postTagController = require('../../controller/postTagController');


Router.post('/createposttag', asyncHandler(postTagController.newTag));

Router.get('/:id',asyncHandler(postTagController.viewATag));

Router.get('/', asyncHandler(postTagController.viewAllTag));

Router.put('/:id',asyncHandler(postTagController.updateTag));

Router.delete('/:id', asyncHandler(postTagController.deleteTag));

module.exports = Router;