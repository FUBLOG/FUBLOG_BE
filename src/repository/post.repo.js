"use strict";
const cloudinary = require('cloudinary').v2;
const postModel = require('../model/post.model');
const isUserIDExist = async (userID) => {
    return await userModel.findOne({ _id: userID }).lean();
};
const imageFormat = (linkimage)=>{
    const imagePattern = /\.(jpg|png)$/i;
    return imagePattern.test(linkimage);
};
const isEmpty = (postContent) => {
    return !postContent || postContent.trim() === '';
};

const deleteimage = async(filesdata) =>{

    for(const file of filesdata){
        cloudinary.uploader.destroy(file.filename)
    }
};
const deleteOldImage = async(imagelinks)=>{
    for(const path of imagelinks){
        cloudinary.uploader.destroy(path)
    }
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
    isUserIDExist,
    createNewPost,
    imageFormat,
    isEmpty,
    deleteimage,
    deleteOldImage,
    updatePost
}