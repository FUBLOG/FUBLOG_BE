const post = require('../model/post.model');

const createPost = async(req,res) =>{
    try {
        const aPost = await post.create(req.body);
        res.status(200).json(aPost)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
    console.log(req.body);
    res.send(req.body)
}


const getAllPost = async(req,res) =>{
    try {
        const aPost = await post.find({});
        res.status(200).json(aPost)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
}

const getAPost = async(req,res) =>{
    try {
        const {id} = req.params;
        const aPost =  await post.findById(id);
        res.status(200).json(aPost)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
}

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
        const aPost = await st.findByIdAndDelete(id);
        if(!aPost){
            return res.status(404).json({message: `Cannot find id : ${id}`});
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
module.exports= {
    createPost,
    getAllPost,
    getAPost,
    UpdateAPost,
    deletePost
}