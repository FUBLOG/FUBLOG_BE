const searchService = require("../services/search.service");
const { OK } = require('../core/response/success.response');

const searchUser = async (req, res, next) => {
  try {
    const { displayName } = req.body;
    const metadata = await searchService.search(displayName);
    const response = new OK({
      message: "Search results",
      metadata
    });
    response.send(res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchUser
};
