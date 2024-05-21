"use strict";
const transporter = require("../config/nodemailer.config");
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
      action_url: `has.io.vn/verify-email?token=${otp}`,
    });
    const options = {
      from: `"Has Team" <${process.env.MAIL_USER}>`,
      to: email,
      subject: template.template_subject,
      html: content,
    };
    const result = await transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
    return result;
  };
}

module.exports = new EmailService();
