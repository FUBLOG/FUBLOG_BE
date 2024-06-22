const searchService = require("../services/search.service");
const { OK } = require("../core/response/success.response");

const searchUser = async (req, res, next) => {
  const { displayName } = req.body;
    const metadata = await searchService.searchUser(displayName);
    const response = new OK({
      message: "Search results",
      metadata
    });
    response.send(res);
  }
  
  const searchMess = async (req, res, next) => {
    const { displayName } = req.body;  
    console.log(displayName); 
    const metadata = await searchService.searchMess(displayName); 
    const response = new OK({
      message: "Search results",
      metadata
    });
    response.send(res);
  };
module.exports = {
  searchUser,
  searchMess
};


