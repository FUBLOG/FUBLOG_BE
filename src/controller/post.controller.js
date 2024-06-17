const { OK } = require("../core/response/success.response");
const { logger } = require("../logger/log.system");
const postService = require("../services/post.service");

class PostController {
  newPost = async (req, res, next) => {
    const userId = req.user.userId;
    const result = new OK({
      message: "Create Post Success",
      metadata: await postService.createPost({
        userId,
        post: req.body,
        filesData: req.files,
        traceId: req.traceId,
      }),
    });
    result.send(res);
  };
  getAllPost = async (req, res, next) => {
    const result = new OK({
      message: " View posts Sucess",
      metadata: await postService.viewpost(),
    });
    result.send(res);
  };
  getAPost = async (req, res, next) => {
    const result = new OK({
      message: " View a post Sucess",
      metadata: await postService.findpost(req.params.id),
    });
    result.send(res);
  };
  updatePost = async (req, res, next) => {
    const result = new OK({
      message: " Update a post Success",
      metadata: await postService.updatepost(req.params, req.body, req.files),
    });
    result.send(res);
  };
  deletePost = async (req, res, next) => {
    const result = new OK({
      message: " Update a post Sucess",
      metadata: await postService.deletepost(req.params),
    });
    result.send(res);
  };

  searchPostsByTag = async (req, res, next) => {
    const result = new OK({
      message: "Search By Tag was successful",
      metadata: await postService.findPostByTag(req.params),
    });
    result.send(res);
  };
  searchPostsByUserId = async (req, res, next) => {
    const result = new OK({
      message: "Search By User was successful",
      metadata: await postService.findPostByUserId(req.params),
    });
    result.send(res);
  };
  getPosts = async (req, res, next) => {
    const result = new OK({
      message: "Get post was successful",
      metadata: await postService.getPosts(req),
    });
    result.send(res);
  };
}
module.exports = new PostController();
