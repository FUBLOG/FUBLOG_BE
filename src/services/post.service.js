const post = require("../model/post.model");
const { ConflictRequestError } = require("../core/response/error.response");
const { NotFoundError } = require("../core/response/error.response");
const { imageFormat } = require("../repository/post.repo");
const { BadRequestError } = require("../core/response/error.response");

class postService {
  createPost = async ({ postLinkToImages = null, postContent = null }) => {
    const condition = await imageFormat(postLinkToImages);
    const condition2 = await isEmpty(postContent);
    if (!condition) throw new ConflictRequestError("Wrong Format");
    if (condition2) throw new BadRequestError("COntent is empty");
    return (addpost = await post.create(req.body));
  };

  viewpost = async () => {
    const viewposts = await post.find();
    if (viewposts.length > 0) throw new NotFoundError();
    return viewposts;
  };
  findpost = async ({ postID }) => {
    const viewApost = await post.find(postID);
    if (viewApost.length > 0) throw new NotFoundError();
    return viewApost;
  };
  updatepost = async (id, { postLinkToImages = null, postContent = null }) => {
    const condition = await imageFormat(postLinkToImages);
    const condition2 = await isEmpty(postContent);
    const condition3 = await isExist(id);
    if (!condition) throw new ConflictRequestError("Wrong Format");
    if (condition2) throw new BadRequestError("COntent is empty");
    if (!condition3) throw new ConflictRequestError("Post not exist");
    return (updatePost = await post.update(id, req.body));
  };
  deletepost = async (id) => {
    const viewApost = await post.findByIdAndDelete(id);
    if (post.findByIdAndDelete(id).length > 0) throw new NotFoundError();
    return viewApost;
  };
}
module.exports = new postService();
