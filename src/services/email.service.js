"use strict";
const transporter = require("../config/nodemailer.config");
const { BadRequestError } = require("../core/response/error.response");
const { log } = require("../logger/log.system");
const { replacePlaceholders } = require("../utils");
const otpService = require("./otp.service");
const templateEmailService = require("./template.email.service");

class EmailService {
  sendEmailVerify = async ({ email = null, otp = null }) => {
    const template = await templateEmailService.getTemplateEmail({
      name: "HTML EMAIL TOKEN",
    });
    const templateH = template.template_html;
    const content = await replacePlaceholders(templateH, {
      action_url: `has.io.vn/welcome-back?token=${otp}`,
    });
    const options = {
      from: `"Has Team" <hasteam@has.io.vn>`,
      to: email,
      subject: template.template_subject,
      html: content,
    };

    try {
      const result = await this.sendMail(options);
      return result;
    } catch (error) {
      throw new BadRequestError("Send email failed");
    }
  };
  sendMail = async (options, callback) => {
    return transporter.sendMail(options);
  };
  sendEmailForgotPassword = async ({ email = null, otp = null }) => {
    const template = await templateEmailService.getTemplateEmail({
      name: "HTML EMAIL FORGOT PASSWORD",
    });
    const templateH = template.template_html;
    const content = await replacePlaceholders(templateH, {
      action_url: `has.io.vn/reset-password?token=${otp}`,
    });
    const options = {
      from: `"Has Team" <hasteam@has.io.vn>`,
      to: email,
      subject: template.template_subject,
      html: content,
    };
    try {
      const result = await this.sendMail(options);
      return result;
    } catch (error) {
      throw new BadRequestError("Send email failed");
    }
  };
}

module.exports = new EmailService();
