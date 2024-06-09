const post = require("../model/post.model");
const { ConflictRequestError } = require("../core/response/error.response");
const { NotFoundError } = require("../core/response/error.response");
const { createNewPost,deleteimage,deleteOldImage, updatePost,deletePost} = require("../repository/post.repo");
const { BadRequestError } = require("../core/response/error.response");
const deleteImage = require("../helpers/deleteImage");
const { isUserIDExist } = require("../repository/user.repo");
const validator = require('../core/validator')



class postService {
  createPost =  async (data,filesdata) => {
    const condition2 =  validator.isEmpty(data.postContent);
    // const condition4 = await validator.isEmpty(filesdata)
    console.log(data);
    // if (!condition) {
    //   await deleteimages(filesdata);
    //   throw new BadRequestError("Wrong Format");
    // }
    // if (condition2){  
    //  const imagearr = filesdata.map(file=>file.path)
    //   await deleteImage(imagearr); 
    //   throw new BadRequestError("COntent is empty");
    // }
    return  await createNewPost(data.body,filesdata,data.user.userId);
  };

  viewpost = async () => {
    const viewposts = await post.find();
    if (viewposts.length === 0) throw new NotFoundError();
    return viewposts;
    
    
  };
  findpost = async (id) => {
    const viewApost = await post.findById(id);
    if (viewApost.length > 0) throw new NotFoundError();
    return viewApost;
  };
  updatepost = async ({id}, data,filesdata) => {
    if(filesdata)
      await deleteImage(aPost.postLinkToImages);
    return await updatePost(id,data,filesdata);
  };
  deletepost = async ({id}) => {
    const deletePost = await post.findByIdAndDelete(id);
    if (!deletePost) 
      throw new NotFoundError("Cannot find ID");
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
}
module.exports = new postService();
