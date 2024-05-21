"use strict";
const transporter = require("../config/nodemailer.config");
const { replacePlaceholders } = require("../utils");
const otpService = require("./otp.service");
const templateEmailService = require("./template.email.service");

class EmailService {
  sendEmail = async ({ email = null }) => {
    const otp = await otpService.generateOTP({ email });

    const template = await templateEmailService.getTemplateEmail({
      name: "HTML EMAIL TOKEN",
    });
    const templateH = template.template_html;
    console.log(templateH);
    const content = await replacePlaceholders(templateH, {
      action_url: `has.io.vn/verify-email?token=${otp}`,
    });
    console.log(content);
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
