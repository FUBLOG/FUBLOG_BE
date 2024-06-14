"use strict";
const { getRedis } = require("../dbs/init.redis");
class RedisService {
  static setPublicPost = (value) => {
    const redis = getRedis();
    const countSets = redis.zCard("posts:public");
    if (countSets > 100) {
      redis.zPopMin("posts:public", 10);
    }
    const valueAsString = JSON.stringify(value);
    redis.zAdd(
      "posts:public",
      [
        {
          score: Date.now(),
          value: valueAsString,
        },
      ],
      { NX: true },
      console.log
    );
  };
  static setPrivatePost = (userId, post) => {
    const redis = getRedis();
    const valueAsString = JSON.stringify(post);
    redis.zAdd(
      `posts:${userId}`,
      [
        {
          score: Date.now(),
          value: valueAsString,
        },
      ],
      { NX: true },
      console.log
    );
  };
  static getPublicPosts = async (start, end) => {
    const redis = getRedis();
    const posts = await redis.zRange("posts:public", start, end);
    return posts.map((post) => JSON.parse(post));
  };
  static getPrivatePosts = async (userId, start, end) => {
    const redis = getRedis();
    const posts = await redis.zRange(`posts:${userId}`, start, end);
    const multi = redis.multi();
    posts.forEach((post) => {
      multi.zrem(`posts:${userId}`, post);
    });
    await multi.execAsync();
    return posts.map((post) => JSON.parse(post));
  };
}

module.exports = RedisService;
