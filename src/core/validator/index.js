const { isDate } = require("lodash");
const validator = require("validator");

class Validator {
  isEmail = async (email) => {
    return validator.isEmail(email);
  };
  isEmpty = async (data) => {
    return validator.isEmpty(data);
  };
  isDate = async (date) => {
    return validator.isDate(date);
  };
  isEmptyObject = async (object = {}) => {
    const result = [];
    const keys = Object.keys(object);
    keys.forEach((key) => {
      if (validator.isEmpty(object[key])) result.push(key);
    });
    return result;
  };

  imageFormat = (linkimage)=>{
    const imagePattern = /\.(jpg|png)$/i;
    return imagePattern.test(linkimage);
};
}
module.exports = new Validator();
