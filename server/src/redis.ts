import { Queue } from "bullmq";
import Redis from "ioredis";
import { redisKeys } from "./constants";

const redis = new Redis(process.env.REDIS_URL!);
redis.on("error", (err) => console.error("Redis client error:", err));

const subscriber = new Redis(process.env.REDIS_URL!);
subscriber.on("error", (err) => console.error("Redis subscriber error:", err));

const activityQueue = new Queue(redisKeys.CONTEST_QUEUE_KEY, {
  connection: {
    url: process.env.REDIS_URL!,
  },
});

await subscriber.subscribe(redisKeys.LIVE_CHANNEL, (err, message: any) => {
  if (err) {
    console.error("Failed to subscribe:", err);
    return;
  }

  console.log("Subscription success");
});

export { redis, activityQueue, subscriber };
