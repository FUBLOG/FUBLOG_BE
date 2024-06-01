const cloudinary = require('cloudinary').v2;


class cloudinaryTask{

    deleteImagecloudinary = async(path)=>{
        cloudinary.uploader.destroy(path)
    }
}
module.exports = new cloudinaryTask();