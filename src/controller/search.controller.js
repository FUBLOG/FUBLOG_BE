const searchService = require("../services/search.service");
const { OK } = require('../core/response/success.response');

const searchUser = async (req, res, next) => {
  const { displayName, profileHash } = req.body;  // Nhận thêm profileHash từ request body
  console.log(displayName); 
  const metadata = await searchService.search(displayName, profileHash);  // Truyền profileHash vào phương thức search
  const response = new OK({
    message: "Search results",
    metadata
  });
  response.send(res);
};

module.exports = {
  searchUser
};
