import { Worker } from "bullmq";
import { redisKeys } from "./constants";
import { redis } from "./redis";

console.log("[Worker] Initializing event processing worker...");

const worker = new Worker(
  redisKeys.CONTEST_QUEUE_KEY,
  async (job) => {
    const { contestId, member, type } = job.data;
    if (!contestId || !member) {
      console.warn("[Worker] Job data missing contestId or member:", job.data);
      return;
    }

    let point = 0;
    switch (type) {
      case "PushEvent":
        point = 5;
        break;
      case "PullRequestEvent":
        point = 15;
        break;
      case "IssuesEvent":
        point = 10;
        break;
      case "CreateEvent":
        point = 30;
        break;
      case "ForkEvent":
        point = 10;
        break;
      case "WatchEvent":
        point = 10;
        break;
      case "IssueCommentEvent":
        point = 5;
        break;
      default:
        point = 5;
    }

    const leaderboardKey = redisKeys.LEADERBOARD_KEY(contestId);
    await redis.zincrby(leaderboardKey, point, member);
    console.log(`[Worker] Contest: ${contestId} | User: ${member} | Event: ${type} | Points: +${point}`);
  },
  {
    connection: { url: process.env.REDIS_URL! },
  },
);

export { worker };
