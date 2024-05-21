"use strict";
const accessService = require("../services/access.service");
const { CREATED, OK } = require("../core/response/success.response");
const templateEmailService = require("../services/template.email.service");
//class not has in production , this only for test
class TestController {
  newTem = async (req, res, next) => {
    const ok = new OK({
      message: "Template Email Created",
      metadata: await templateEmailService.createNewTemplateEmail({
        name: "HTML EMAIL TOKEN",
        subject: "Vui lòng xác nhận địa chỉ Email đăng ký HaS.io.vn!",
      }),
    });
    ok.send(res);
  };
}
module.exports = new TestController();
