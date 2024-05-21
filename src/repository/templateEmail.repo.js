"use strict";
const templateEmailModel = require("../model/template.email.model");

const isTemplateEmailExists = async ({ name = null }) => {
  const templateEmailExists = await templateEmailModel.findOne({ name }).lean();
  if (templateEmailExists) {
    return true;
  }
  return false;
};
const createNewTemplateEmail = async ({
  name = null,
  subject = null,
  html = null,
}) => {
  const newTemplateEmail = await templateEmailModel.create({
    template_name: name,
    template_subject: subject,
    template_html: html,
  });
  return newTemplateEmail;
};
const getTemplateEmail = async ({ name = null }) => {
  const templateEmail = await templateEmailModel
    .findOne({ template_name: name })
    .lean();
  return templateEmail;
};
module.exports = {
  isTemplateEmailExists,
  createNewTemplateEmail,
  getTemplateEmail,
};
