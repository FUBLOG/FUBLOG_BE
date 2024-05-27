const post = require("../model/post.model");
const { ConflictRequestError } = require("../core/response/error.response");
const { NotFoundError } = require("../core/response/error.response");
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
const { createNewPost,deleteimage,deleteOldImage, updatePost} = require("../repository/post.repo");
const { BadRequestError } = require("../core/response/error.response");
const deleteImage = require("../helpers/deleteImage");
const { isUserIDExist } = require("../repository/user.repo");
const validator = require('../core/validator')


class postService {
  createPost = async (data,filesdata) => {
    // const condition =  validator.imageFormat(data.postLinkToImages);
    const condition2 =  validator.isEmpty(data.postContent);
    // const condition3 = await isUserIDExist(data.UserID);
    // if (!condition) {
    //   await deleteimages(filesdata);
    //   throw new ConflictRequestError("Wrong Format");
    // }
    if (condition2){  
     const imagearr = filesdata.map(file=>file.path)
      await deleteImage(imagearr); 
      throw new BadRequestError("COntent is empty");
    }
    // if (!condition) {
    //   await deleteimage(filesdata); 
    //   throw new ConflictRequestError("Wrong Format");
    // }
    return  await createNewPost(data,filesdata);
>>>>>>> 5bb1e783222ee1d36e5703df5db0ab4d6a175491
  };

  viewpost = async () => {
    const viewposts = await post.find();
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
=======
    if (viewposts.length === 0) throw new NotFoundError();
    return viewposts;
    
  };
  findpost = async (id) => {
    const viewApost = await post.findById(id);
    if (viewApost.length > 0) throw new NotFoundError();
    return viewApost;
  };
  updatepost = async ({id}, data,filesdata) => {
    // const condition = await validator.imageFormat(data.postLinkToImages);
    // const condition2 = await validator.isEmpty(data.postContent);
    // const condition3 = await isExist(id);
    // if (!condition) throw new ConflictRequestError("Wrong Format");
    // if (condition2) throw new BadRequestError("COntent is empty");
    // if (!condition3) throw new ConflictRequestError("Post not exist");
    const aPost = await this.findpost(id);
    await deleteImage(aPost.postLinkToImages);
    console.log(filesdata);
    return await updatePost(id,data,filesdata);
  };
  deletepost = async ({id}) => {
    const deletePost = await post.findByIdAndDelete(id);
    if (post.findByIdAndDelete(id).length === 0) throw new NotFoundError();
    return deletePost;
  };
  findPostByTag = async({id})=>{
    const findPostsByTag = await post.find({postTagID: id})
    console.log(findPostsByTag)
      if(!findPostsByTag)
        throw new NotFoundError();  
      return findPostsByTag;
  };
  findPostByUserId = async({id})=>{
    const findPostsByUser = await post.find({UserID: id})
    console.log(findPostsByUser)
      if(!findPostsByUser)
        throw new NotFoundError();  
      return findPostsByUser;
  }
>>>>>>> 5bb1e783222ee1d36e5703df5db0ab4d6a175491
}
module.exports = new postService();
