const { OK } = require("../core/response/success.response");
const postTagService = require("../services/postTag.service");

class postTagController{
    newTag = async(req,res,next)=>{
        const result = new OK({
            message: "Create Tag Successful!",
            metadata: await postTagService.createNewTag(req.body)
        })
        result.send(res)
    };
    viewAllTag = async(req,res,next) => {
        const result = new OK({
            message: "View Tag Successful!",
            metadata: await postTagService.viewAllTag()
        })
        result.send(res)
    };
    
    viewATag = async(req,res,next) => {
        const ide = req.params.id;
        const result = new OK({
            message: "View Tag Successful!",
            metadata: await postTagService.viewTag(ide)
        })
        result.send(res)
    };
    updateTag = async(req,res,next) => {
        const ide = req.params.id;
        const result = new OK({
            message: "Update Tag Successful!",
            metadata: await postTagService.updateTag(ide,req.body)
        })
        result.send(res)
    };
    deleteTag = async(req,res,next) => {
        const ide = req.params.id;
        const result = new OK({
            message: "Delete Tag Successful!",
            metadata: await postTagService.deleteTag(ide)
        })
        result.send(res)
    }
}
module.exports = new postTagController();