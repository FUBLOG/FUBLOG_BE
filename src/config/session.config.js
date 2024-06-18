const RedisStore = require("connect-redis").default;
const Redis = require("../dbs/init.redis");
const { v4: uuidv4 } = require("uuid");
const initConfig = async () => {
  const redisClient = await Redis.initRedis();
  console.log("Redis client", redisClient);
  let redisStore = new RedisStore({
    client: redisClient,
    //prefix: "has.io.vn:",
  });
  const sessionConfig = {
    genid: (req) => {
      return uuidv4();
    },
    secret: "keyboard cat",
    resave: false,
    store: redisStore,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: true,
      httpOnly: true,
    },
  };
  console.log("Session init");
  return sessionConfig;
};

module.exports = initConfig;
