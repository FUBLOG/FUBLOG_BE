"use strict";
const cloudinary = require('cloudinary').v2;


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
},filesdata,userId)=>
    
    {
        const uid = userId;
        const urls = filesdata.map(file => {
            const pID = file.filename;
            return cloudinary.url(pID, { width: 750, height: 500, crop: 'fill' });
        });
        console.log(urls);
    return await postModel.create({
        UserID: uid,
        postTagID,
        postContent,
        postLinkToImages: urls,
        postStatus,
        likes
})



}
const updatePost = async(id,{
    UserID ,
    postTagID,
    postContent,
    postLinkToImages,
    postStatus,
    likes
},filesdata)=>{
    const urls = filesdata.map(file => {
        const pID = file.filename;
        return cloudinary.url(pID, { width: 750, height: 500, crop: 'fill' });
    });
    return await postModel.findByIdAndUpdate(id,{
        UserID,
        postTagID,
        postContent,
        postLinkToImages: urls,
        postStatus,
        likes
    }) 
}
module.exports = {
    createNewPost,
    deleteimage,
    deleteOldImage,
    updatePost,
    findPostByUserID
}