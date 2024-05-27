"use strict";

const postModel = require('../model/post.model');
<<<<<<< HEAD

const 
=======
const isUserIDExist = async (userID) => {
    return await userModel.findOne({ _id: userID }).lean();
};
const imageFormat = (linkimage)=>{
    const imagePattern = /\.(jpg|png)$/i;
    return imagePattern.test(linkimage);
}
const isEmpty = (postContent) => {
    return !postContent || postContent.trim() === '';
};
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
module.exports = {
    isUserIDExist,
    createNewPost,
    imageFormat,
    isEmpty
}
>>>>>>> 56dadcddb52f373952911de37af528d272185027
