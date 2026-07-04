import { Queue } from "bullmq";
import Redis from "ioredis";
import { redisKeys } from "./constants";

const redis = new Redis(process.env.REDIS_URL!);

const activityQueue = new Queue(redisKeys.CONTEST_QUEUE_KEY, {
  connection: {
    url: process.env.REDIS_URL!,
  },
});

export { redis, activityQueue };
