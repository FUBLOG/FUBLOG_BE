const postTagModel = require("../model/postTag.model");

const getAll = async () => {
  return await postTagModel.find();
};

const createNewTag = async ({ postTagContent }) => {
  return await postTagModel.create({ postTagContent });
};

const viewTag = async (id) => {
  return await postTagModel.findById(id);
};

const updateTag = async (id, content) => {
  return await postTagModel.findByIdAndUpdate(id, content);
};

const deleteTag = async (id) => {
  return await postTagModel.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  createNewTag,
  viewTag,
  updateTag,
  deleteTag,
};
