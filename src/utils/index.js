const _ = require("lodash");
const { default: mongoose } = require("mongoose");
const { isExisProfileHash } = require("../repository/userInfo.repo");
const { v4: uuidv4 } = require("uuid");

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
  return new mongoose.Types.ObjectId(string);
};

const extractUserProfileFromEmail = async (email) => {
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    const hash = email.substring(0, atIndex);
    const exist = await isExisProfileHash(hash);
    if (!exist) {
      return hash;
    } else {
      return `${hash}${Math.floor(Math.random() * 1000)}`;
    }
  } else {
    return null; // Invalid email format
  }
};

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function genUUID() {
  return uuidv4();
}
module.exports = {
  replacePlaceholders,
  getInfoData,
  getSelectData,
  unGetSelectData,
  updateNestedObjectParser,
  removeNull,
  convertToObjectId,
  extractUserProfileFromEmail,
  removeAccents,
  genUUID,
};
