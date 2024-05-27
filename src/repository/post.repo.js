"use strict";

const postModel = require('../model/post.model');
<<<<<<< HEAD
<<<<<<< HEAD

const 
=======
=======
>>>>>>> da87c34db838cea6c561f762b0beb0c6a0eff9a5
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
<<<<<<< HEAD
}
>>>>>>> 56dadcddb52f373952911de37af528d272185027
=======
}
>>>>>>> da87c34db838cea6c561f762b0beb0c6a0eff9a5
