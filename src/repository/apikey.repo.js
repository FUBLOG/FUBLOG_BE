const apikey = require("../model/apikey");

const findKey = async (key) => {
  return await apikey.findOne({
    key: key,
    status: true,
  });
};

module.exports = { findKey };
