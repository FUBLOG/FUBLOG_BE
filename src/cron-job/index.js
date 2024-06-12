const cron = require("node-cron");
const newfeedModel = require("../model/newfeeds.model");
cron.schedule(
  "0 0 * * *",
  function () {
    console.log("running a task every day at 00:00");
    newfeedModel
      .updateMany({ timeDecay: { $gt: 10 } }, { $inc: { timeDecay: -10 } })
      .then(() => console.log("Updated timeDecay for all posts"))
      .catch((err) => console.error(err));
  },
  {
    scheduled: true,
    timezone: "Asia/Ho_Chi_Minh",
  }
);

module.exports = cron;
