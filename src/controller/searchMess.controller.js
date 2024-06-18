const searchMessSer = require("../services/searchMess.service")
const {OK} = require("../core/response/success.response");

const searchMess = async(req,res,next)=>{
   const {displayname} = req.body;
   const response = new OK({
      message:"Search results",
      metadata: await searchMessSer.searchMess(displayname)
   })
   response.send(res);
}

module.exports={
   searchMess
}