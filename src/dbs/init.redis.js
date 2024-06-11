"use strict";
const redis = require("redis");
const { logger } = require("../logger/log.system");
const connectRedis = {
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  password: process.env.REDIS_PASSWORD,
  username: "default",
  connect_timeout: 10000,
};

let client = {};
const statusConnectRedis = {
  CONNECT: "connect",
  END: "end",
  ERROR: "error",
  RECONNECTING: "reconnecting",
};
const handleErrors = ({ instance }) => {
  instance.on(statusConnectRedis.CONNECT, () => {
    console.log("Redis connected");
  });
  instance.on(statusConnectRedis.END, () => {
    console.log("Redis end");
  });
  instance.on(statusConnectRedis.ERROR, (err) => {
    console.log("Redis error", err);
  });
  instance.on(statusConnectRedis.RECONNECTING, () => {
    console.log("Redis reconnecting");
  });
};
const initRedis = async () => {
  console.log("Redis init");
  const instance = redis.createClient(connectRedis);
  handleErrors({ instance });
  await instance.connect();
  client.instance = instance;
  
};

const getRedis = () => client.instance;

const closeRedis = () => {
  client.instance.quit();
  logger.log("Redis closed", []);
};

module.exports = {
  initRedis,
  getRedis,
  closeRedis,
};
