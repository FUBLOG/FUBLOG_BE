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
      metadata: await postService.ViewPost(),
    });
    result.send(res);
  };
  getAPost = async (req, res, next) => {
    const result = new OK({
      message: " View a post Sucess",
      metadata: await postService.findPost(req.params.id),
    });
    result.send(res);
  };
  updatePost = async (req, res, next) => {
    const result = new OK({
      message: " Update a post Success",
      metadata: await postService.updatePost(req.params, req.body, req.files),
    });
    result.send(res);
  };
  deletePost = async (req, res, next) => {
    const result = new OK({
      message: " Update a post Sucess",
      metadata: await postService.deletePost(req.params),
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
  getPostForGuest = async (req, res, next) => {
    const { page = 0, limit = 10 } = req.query;
    const seenIds =  req.session.seenIds || [];
    const posts = await postService.getPostsForGuest({ page, limit, seenIds });
    req.session.seenIds = seenIds.concat(posts.map((post) => post._id));
    const result = new OK({
      message: "Get post was successful",
      metadata: posts,
    });
    result.send(res);
  };

  getPostForUser = async (req, res, next) => {
    const { page = 0, limit = 10 } = req.query;
    const seenIds = req.session.seenIds || [];
    const userId = req.user.userId;
    const { posts, seen } = await postService.getPostsForUser({
      userId,
      page,
      limit,
      seenIds,
    });
    req.session.seenIds = seenIds.concat(seen);
    const result = new OK({
      message: "Get post was successful",
      metadata: posts,
    });
    result.send(res);
  };
}
module.exports = new PostController();
