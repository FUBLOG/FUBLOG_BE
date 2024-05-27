const { ConflictRequestError,NotFoundError } = require('../core/response/error.response')
const postTagModel = require('../model/postTag.model')
const validator = require('validator')

class postTagService{

    createNewTag = async({postTagContent})=>{
        const create =  await postTagModel.create({postTagContent});
        if(create.length===0)
            throw new ConflictRequestError("Content is empty")
        return create;
    } ;
    viewTag = async(id)=>{
        const viewATag = await postTagModel.findById(id)
        if(viewATag.length === 0)
            throw new NotFoundError("Cannot Find ");
        return viewATag
    };
    viewAllTag = async()=>{
        const viewTag = await postTagModel.find()
        if(viewTag.length === 0)
            throw new NotFoundError("Cannot Find ");
        return viewTag
    };
    updateTag = async(id,content)=>{
        if(await this.viewTag(id).length === 0)
             throw new NotFoundError("Cannot Find ID");
        if(content.length === 0)
            throw new ConflictRequestError("Content is empty")
        return await postTagModel.findByIdAndUpdate(id, content)
    };
    deleteTag = async(id)=>{
        if(await this.viewTag(id).length === 0)
            throw new NotFoundError("Cannot Find ID");
        return await postTagModel.findByIdAndDelete(id)
    }

}
module.exports = new postTagService();