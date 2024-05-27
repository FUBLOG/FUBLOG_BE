const _ = require("lodash");
const { default: mongoose } = require("mongoose");
const replacePlaceholders = async (template, params) => {
  Object.keys(params).forEach((key) => {
    const placeHolder = `{{${key}}}`;
    template = template.replace(new RegExp(placeHolder, "g"), params[key]);
  });
  return template;
};

const getInfoData = ({ filed = [], object = {} }) => {
  return _.pick(object, filed);
};
const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((item) => [item, 1]));
};
const unGetSelectData = (select = []) => {
  return Object.fromEntries(select.map((item) => [item, 0]));
};
const updateNestedObjectParser = (obj) => {
  const final = {};
  Object.keys(obj).forEach((k) => {
    if (
      typeof obj[k] === "object" &&
      !Array.isArray(obj[k]) &&
      obj[k] !== null
    ) {
      const response = updateNestedObjectParser(obj[k]);
      Object.keys(response).forEach((a) => {
        final[`${k}.${a}`] = response[a];
      });
    } else {
      final[k] = obj[k];
    }
  });
  return final;
};
const removeNull = (object) => {
  Object.keys(object).forEach((key) => {
    if (object[key] == null) {
      delete object[key];
    }
  });
  return object;
};

const convertToObjectId = (string) => {
<<<<<<< HEAD
  return mongoose.Types.ObjectId.createFromHexString(string);
=======
  return new mongoose.Types.ObjectId(string);
>>>>>>> da87c34db838cea6c561f762b0beb0c6a0eff9a5
};

const extractUserProfileFromEmail = (email) => {
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    return email.substring(0, atIndex);
  } else {
    return null; // Invalid email format
  }
};
module.exports = {
  replacePlaceholders,
  getInfoData,
  getSelectData,
  unGetSelectData,
  updateNestedObjectParser,
  removeNull,
  convertToObjectId,
  extractUserProfileFromEmail,
};
