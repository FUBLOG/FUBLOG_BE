const stttSer = require("../services/statistics.service");
const { OK } = require("../core/response/success.response");

const getSttt = async (req, res, next) => {
  const date = req.query.date ? new Date(req.query.date) : new Date();
    const metadata = await stttSer.getSttt(date);
    const response = new OK({
      message: "Got statistics",
      metadata
    });
    response.send(res);
};

const getMonSttt = async (req, res, next) => {
  const metadata = await stttSer.getMonSttt();
  const response = new OK({
      message: "Got monthly statistics",
      metadata
    });
    response.send(res);
};

module.exports = {
  getSttt,
  getMonSttt
};
