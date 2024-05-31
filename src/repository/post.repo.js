"use strict";
const cloudinaryTask = require('../core/cloudinary')
const postModel = require('../model/post.model');

const deleteimage = async(filesdata) =>{

    for(const file of filesdata){
        cloudinaryTask.deleteImagecloudinary(file.filename)
    }
};
const deleteOldImage = async(imagelinks)=>{
    for(const path of imagelinks){
        cloudinaryTask.deleteImagecloudinary(path)
    }
}
const findPostByUserID = async(id) =>{
    const posts = postModel.find({UserID : id})
}
const createNewPost = async({
    UserID,
    postTagID,
    postContent,
    postLinkToImages,
    postStatus,
    likes
},filesdata)=>
    
    {
        const imagelink = filesdata.map(file => file.path);
        const finalImagePaths = imagelink.length > 0 ? imagelink : [];

    return await postModel.create({
        UserID,
        postTagID,
        postContent,
        postLinkToImages: finalImagePaths,
        postStatus,
        likes
})



}
const updatePost = async(id,{
    UserID,
    postTagID,
    postContent,
    postLinkToImages,
    postStatus,
    likes
},filesdata)=>{
    console.log(id)
    const path = filesdata.map(file => file.path);
    console.log(path);
    const filepath = path.length > 0 ? path : [];
    return await postModel.findByIdAndUpdate(id,{
        UserID,
        postTagID,
        postContent,
        postLinkToImages: filepath,
        postStatus,
        likes
    }) 
}
module.exports = {
    createNewPost,
    deleteimage,
    deleteOldImage,
    updatePost
}