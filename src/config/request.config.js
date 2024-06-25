const rateLimit = require("express-rate-limit");
const { TooManyRequestsError } = require("../core/response/error.response");

const limiter = rateLimit({
  windowMs: 1000 * 60, // 1 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  handle: (req, res, next) => {
    const error = new TooManyRequestsError(
      "Too many requests from this IP, please try again after a minutes"
    );
    next(error);
  },
});

module.exports = {
  limiter,
};
