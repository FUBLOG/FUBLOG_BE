const post = require("../model/post.model");
const { ConflictRequestError } = require("../core/response/error.response");
const { NotFoundError } = require("../core/response/error.response");
<<<<<<< HEAD
<<<<<<< HEAD
const { imageFormat } = require("../repository/post.repo");
const { BadRequestError } = require("../core/response/error.response");

class postService {
  createPost = async ({ postLinkToImages = null, postContent = null }) => {
    const condition = await imageFormat(postLinkToImages);
    const condition2 = await isEmpty(postContent);
    if (!condition) throw new ConflictRequestError("Wrong Format");
    if (condition2) throw new BadRequestError("COntent is empty");
    return (addpost = await post.create(req.body));
=======
=======
>>>>>>> da87c34db838cea6c561f762b0beb0c6a0eff9a5
const { imageFormat,isUserIDExist,createNewPost,isEmpty} = require("../repository/post.repo");
const { BadRequestError } = require("../core/response/error.response");


class postService {
  createPost = async (data,filesdata) => {
    // const condition =  imageFormat(data.postLinkToImages);
    // const condition2 =  isEmpty(data.postContent);
    // const condition3 = await isUserIDExist(data.UserID);
    // if (!condition) {
    //   throw new ConflictRequestError("Wrong Format");
    // }
    // if (condition2) throw new BadRequestError("COntent is empty");
    // if (!condition) throw new ConflictRequestError("Wrong Format");
    return  await createNewPost(data,filesdata);
<<<<<<< HEAD
>>>>>>> 56dadcddb52f373952911de37af528d272185027
=======
>>>>>>> da87c34db838cea6c561f762b0beb0c6a0eff9a5
  };

  viewpost = async () => {
    const viewposts = await post.find();
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> da87c34db838cea6c561f762b0beb0c6a0eff9a5
    if (viewposts.length === 0) throw new NotFoundError();
    return viewposts;
  };
  findpost = async ({id} ) => {
    const viewApost = await post.findById(id);
    if (viewApost.length > 0) throw new NotFoundError();
    return viewApost;
  };
  updatepost = async ({id}, data) => {
    const condition = await imageFormat(data.postLinkToImages);
    const condition2 = await isEmpty(data.postContent);
<<<<<<< HEAD
>>>>>>> 56dadcddb52f373952911de37af528d272185027
=======
>>>>>>> da87c34db838cea6c561f762b0beb0c6a0eff9a5
    const condition3 = await isExist(id);
    if (!condition) throw new ConflictRequestError("Wrong Format");
    if (condition2) throw new BadRequestError("COntent is empty");
    if (!condition3) throw new ConflictRequestError("Post not exist");
<<<<<<< HEAD
<<<<<<< HEAD
    return (updatePost = await post.update(id, req.body));
  };
  deletepost = async (id) => {
    const viewApost = await post.findByIdAndDelete(id);
    if (post.findByIdAndDelete(id).length > 0) throw new NotFoundError();
    return viewApost;
=======
=======
>>>>>>> da87c34db838cea6c561f762b0beb0c6a0eff9a5
    return await post.findByIdAndUpdate(id, data);
  };
  deletepost = async ({id}) => {
    const deletepost = await post.findByIdAndDelete(id);
    if (post.findByIdAndDelete(id).length === 0) throw new NotFoundError();
    return deletepost;
<<<<<<< HEAD
>>>>>>> 56dadcddb52f373952911de37af528d272185027
=======
>>>>>>> da87c34db838cea6c561f762b0beb0c6a0eff9a5
  };
}
module.exports = new postService();
