"use strict";

const {
  isTemplateEmailExists,
  createNewTemplateEmail,
  getTemplateEmail,
} = require("../repository/templateEmail.repo");
const template = require("../test/testTemplate");
const { ConflictRequestError } = require("../core/response/error.response");

class TemplateEmailService {
  createNewTemplateEmail = async ({
    name = null,
    subject = null,
    html = null,
  }) => {
    const isExists = await isTemplateEmailExists({ name });
    if (isExists)
      throw new ConflictRequestError("Template Email already exists");
    return await createNewTemplateEmail({ name, subject, html: template() });
  };
  getTemplateEmail = async ({ name = null }) => {
    const templateEmail = await getTemplateEmail({ name });
    return templateEmail;
  };
}
module.exports = new TemplateEmailService();
