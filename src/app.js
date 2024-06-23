const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const { app } = require("./config/socket.config");
const cors = require("cors");
const { corsOptions } = require("./config/cors.config");
const logger = require("./logger/log.system");
const { v4: uuidv4 } = require("uuid");
const session = require("express-session");
const Redis = require("./dbs/init.redis");
const { default: RedisStore } = require("connect-redis");
class App {
  setup = async () => {
    //config cors
    app.use(cors(corsOptions)); //config cors

    //int middlewares
    app.set("trust proxy", 1);
    app.use(morgan("dev")); //config request return
    app.use(helmet()); //config security request
    app.use(compression()); // data compression
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    //init db
    require("./dbs/init.mongodb");
    const client = await Redis.initRedis();
    //init session
    app.use(
      session({
        genid: (req) => uuidv4(),
        secret: "keyboard cat",
        store: new RedisStore({ client }),
        resave: false,
        saveUninitialized: true,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24,
          secure: "auto",
          httpOnly: true,
        },
      })
    );
    //init cron-job
    require("./cron-job/index");

    //Set traceId
    app.use((req, res, next) => {
      const traceId = req.headers["x-trace-id"] || uuidv4();
      console.log(req.session);
      if (traceId) {
        req.traceId = traceId;
        req.now = Date.now();
      }
      logger.log(`Input: ${req.method}`, [
        req.path,
        { requestId: traceId },
        req.method === "GET" ? req.query : req.body,
      ]);
      next();
    });

    //init routes
    app.use("/v1/api", require("./routes"));

    //handle Error
    app.use((req, res, next) => {
      const error = new Error("Not Found");
      error.status = 404;
      next(error);
    });

    // hàm quản lí lỗi
    app.use((error, req, res, next) => {
      const resMessage = `${error.status} - ${Date.now() - req.now}ms - ${
        error.message
      }`;
      const options = [
        req.path,
        { requestId: req.traceId },
        { message: resMessage },
      ];
      const statusCode = error.status || 500;
      if (statusCode === 500) {
        logger.error("error", options);
      } else {
        logger.warn("warn", options);
      }
      return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        stack: error.stack,
        message: error.message || "Internal Server Error",
      });
    });
  };
}
const appSetup = new App();
appSetup.setup();
module.exports = app;
