const cloudinary = require('cloudinary').v2;

 const deleteImage = async (urlArr)=>{
    const addressArr = urlArr.map((urlItem) => {
        const elements = urlItem.split("/");
        return `${elements[7]}/${elements[8].split(".")[0]}`;
      });
    try {
      cloudinary.api.delete_resources(addressArr, 
        { type: 'upload', resource_type: 'image' })
    } catch (error) {
      throw(error)
    }
  }
module.exports =  deleteImage;
