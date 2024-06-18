const session = require("express-session");
const { getRedis } = require("../dbs/init.redis");
const RedisStore = require("connect-redis").default

const redisClient =  getRedis();
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "has.io.vn:",
});

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  store: redisStore,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    //secure: true,
    //httpOnly: true,
  },
};

module.exports = session(sessionConfig);
