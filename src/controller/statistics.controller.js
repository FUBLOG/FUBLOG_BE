const stttSer = require("../services/statistics.service");
const { OK } = require("../core/response/success.response");

const getSttt = async (req, res,next) => {
  try {
    const date = req.query.date ? new Date(req.query.date) : new Date();
    const metadata = await stttSer.getStatistics(date);
    const response = new OK({
      message: "got statistics",
      metadata
    });
    response.send(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getSttt};
