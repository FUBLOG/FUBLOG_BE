<<<<<<< HEAD
const post = require('../model/post.model');
const { OK } = require("../core/response/success.response");
const postService = require('../services/post.service')

=======
const post = require("../model/post.model");
const { OK } = require("../core/response/success.response");
const postService = require('../services/post.service')
>>>>>>> 5bb1e783222ee1d36e5703df5db0ab4d6a175491

class postcontroller {
    newpost = async(req, res, next)=> {
        const result = new OK({
            message: "Create Post Success",
            metadata: await postService.createPost(req.body,req.files)
        })
        result.send(res);
    };
    getallpost = async(req, res, next)=>{
        const result = new OK({
            message:" View posts Sucess",
            metadata: await postService.viewpost()
        })
        result.send(res);
    };
    getApost = async(req, res, next)=>{
        const result = new OK({
            message:" View a post Sucess",
            metadata: await postService.findpost(req.params.id)
        })
        result.send(res);
    };
    updatePost = async(req, res, next)=>{
        const result = new OK({
            message:" Update a post Success",
            metadata: await postService.updatepost(req.params,req.body,req.files)
        })
        result.send(res);
    };
    deletePost = async(req, res, next)=>{
        const result = new OK({
            message:" Update a post Sucess",
            metadata: await postService.deletepost(req.params)
        })
        result.send(res);
    };

    searchPostsByTag = async(req,res,next) => {
            const result = new OK ({
                message: "Search By Tag was successful",
                metadata: await postService.findPostByTag(req.params)
            })
            result.send(res);
    }
    searchPostsByUserId = async(req,res,next) => {
        const result = new OK ({
            message: "Search By User was successful",
            metadata: await postService.findPostByUserId(req.params)
        })
        result.send(res);
}
}
<<<<<<< HEAD

const UpdateAPost = async (req,res) =>{
    try {
        const {id} = req.param;
        const aPost = post.findByIDAndUpdate(id,req.body);
        if(!aPost){
            return res.status(404).json({message: `Cannot find id: ${id}`});
        }
        res.status(200).json(aPost)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
    console.log(req.body);
    res.send(req.body)
}
const deletePost = async(req,res)=> {
    try {
        const {id} = req.params;
        const aPost = await post.findByIdAndDelete(id);
        if(!aPost){
            return res.status(404).json({message: `Cannot find id : ${id}`});
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
<<<<<<< HEAD
class postController {
    newpost = async(req, res, next)=> {
        const result = new OK({
            message: "Create Post Success",
            metadata: await postService.createPost(req.body)
=======
class postcontroller {
    newpost = async(req, res, next)=> {
        const result = new OK({
            message: "Create Post Success",
            metadata: await postService.createPost(req.body,req.files)
>>>>>>> 56dadcddb52f373952911de37af528d272185027
        })
        result.send(res);
    };
    getallpost = async(req, res, next)=>{
        const result = new OK({
            message:" View posts Sucess",
            metadata: await postService.viewpost()
        })
<<<<<<< HEAD
=======
        result.send(res);
>>>>>>> 56dadcddb52f373952911de37af528d272185027
    };
    getApost = async(req, res, next)=>{
        const result = new OK({
            message:" View a post Sucess",
            metadata: await postService.findpost(req.params)
        })
<<<<<<< HEAD
=======
        result.send(res);
>>>>>>> 56dadcddb52f373952911de37af528d272185027
    };
    updatePost = async(req, res, next)=>{
        const result = new OK({
            message:" Update a post Sucess",
            metadata: await postService.updatepost(req.params,req.body)
        })
<<<<<<< HEAD
=======
        result.send(res);
>>>>>>> 56dadcddb52f373952911de37af528d272185027
    };
    deletePost = async(req, res, next)=>{
        const result = new OK({
            message:" Update a post Sucess",
            metadata: await postService.deletepost(req.params)
        })
<<<<<<< HEAD
    };

}
module.exports= {
    createPost,
    getAllPost,
    getAPost,
    UpdateAPost,
    deletePost
}
=======
module.exports = new postcontroller();
>>>>>>> 5bb1e783222ee1d36e5703df5db0ab4d6a175491
