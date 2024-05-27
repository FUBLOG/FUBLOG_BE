const cloudinary = require('cloudinary').v2;

 const deleteImage = async (urlArr)=>{
    const addressArr = urlArr.map((urlItem) => {
      console.log(urlItem)
        const elements = urlItem.split("/");
        return `${elements[7]}/${elements[8].split(".")[0]}`;
      });
      console.log(addressArr)
    try {
      cloudinary.api
      .delete_resources(addressArr, 
        { type: 'upload', resource_type: 'image' })
        console.log("deleted")
    } catch (error) {
      throw(error)
    }
  
  }
module.exports =  deleteImage;
