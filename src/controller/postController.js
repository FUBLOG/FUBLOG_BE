const post = require("../model/post.model");
const { OK } = require("../core/response/success.response");
const postService = require("../services/post.service");

class postcontroller {
  newpost = async (req, res, next) => {
    const result = new OK({
      message: "Create Post Success",
      metadata: await postService.createPost(req.body, req.files),
    });
    result.send(res);
  };
  getallpost = async (req, res, next) => {
    const result = new OK({
      message: " View posts Sucess",
      metadata: await postService.viewpost(),
    });
    result.send(res);
  };
  getApost = async (req, res, next) => {
    const result = new OK({
      message: " View a post Sucess",
      metadata: await postService.findpost(req.params),
    });
    result.send(res);
  };
  updatePost = async (req, res, next) => {
    const result = new OK({
      message: " Update a post Sucess",
      metadata: await postService.updatepost(req.params, req.body),
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
}
module.exports = new postcontroller();
