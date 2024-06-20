const searchService = require("../services/searchMess.service");
const { OK } = require("../core/response/success.response");

const searchUser = async (req, res, next) => {
  const { displayName,profileHash } = req.body;
    const metadata = await searchService.search(displayName,profileHash);
    const response = new OK({
      message: "Search results",
      metadata
    });
    response.send(res);
  }
module.exports = {
  searchUser
};


