import { redisKeys } from "./constants";
import { DUMMY_USERS } from "./dummy_data";
import { activityQueue, redis } from "./redis";
import cron from "node-cron";

const startContest = async () => {
  try {
    const currentContestId = await redis.get(redisKeys.ACTIVE_CONTEST_ID_KEY);

    if (currentContestId) {
      const leaderboardKey = redisKeys.LEADERBOARD_KEY(currentContestId);

      const rawLeaderboard = await redis.zrevrange(
        leaderboardKey,
        0,
        -1,
        "WITHSCORES",
      );

      const rankings = [];
      for (let i = 0; i < rawLeaderboard.length; i += 2) {
        rankings.push({
          username: rawLeaderboard[i]!,
          score: parseInt(rawLeaderboard[i + 1] || "0", 10),
        });
      }

      const winner = rankings[0]?.username || "No Participant";
      const endedAt = Date.now();
      console.log(
        `[cron] Archiving contest history for: ${currentContestId}. Winner: ${winner}`,
      );

      await redis.zadd("contest:history:index", endedAt, currentContestId);

      await redis.hset(`contest:history:data:${currentContestId}`, {
        contestId: currentContestId,
        endedAt: String(endedAt),
        winner: winner,
        rankings: JSON.stringify(rankings),
      });
    }

    // Drain the queue to clear delayed/waiting jobs from the previous contest
    await activityQueue.drain(true);

    const contestNum = await redis.incr(redisKeys.TOTAL_CONTEST);
    const contestId = `contest_${contestNum}`;
    const leaderboardKey = redisKeys.LEADERBOARD_KEY(contestId);

    console.log(`[cron] Starting new contest: ${contestId}`);

    await redis.set(redisKeys.ACTIVE_CONTEST_ID_KEY, contestId);

    const pipeline = redis.pipeline();
    DUMMY_USERS.forEach((user) => {
      pipeline.zadd(leaderboardKey, 0, user.login);
    });

    pipeline.expire(leaderboardKey, 300);
    await pipeline.exec();

    interface FlattenedEvent {
      id: string;
      type: string;
      member: string;
      repo: { name: string; url: string };
      public: boolean;
      timestamp: number;
    }

    const allEvents: FlattenedEvent[] = [];
    DUMMY_USERS.forEach((user) => {
      user.events.forEach((event) => {
        allEvents.push({
          id: event.id,
          type: event.type,
          member: user.login,
          timestamp: new Date(event.created_at).getTime(),
          public: event.public,
          repo: event.repo,
        });
      });
    });

    allEvents.sort((a, b) => a.timestamp - b.timestamp);

    if (allEvents.length > 0) {
      const firstEvent = allEvents[0];
      const lastEvent = allEvents[allEvents.length - 1];
      if (firstEvent && lastEvent) {
        const minTime = firstEvent.timestamp;
        const maxTime = lastEvent.timestamp;
        const timeSpan = maxTime - minTime || 1;
        const contestDurationMs = 3 * 60 * 1000;

        console.log(
          `[cron] Scheduling ${allEvents.length} events over 3 minutes...`,
        );

        for (const event of allEvents) {
          const relativeProgress = (event.timestamp - minTime) / timeSpan;
          const delayMs = Math.round(relativeProgress * contestDurationMs);

          await activityQueue.add(
            event.id,
            {
              contestId,
              type: event.type,
              member: event.member,
            },
            {
              delay: delayMs,
              removeOnComplete: true,
              removeOnFail: true,
            },
          );
        }
        console.log(
          `[cron] Successfully scheduled all events for ${contestId}`,
        );
      }
    }
  } catch (error) {
    console.error("[cron] Error starting contest:", error);
  }
};

// Schedule job to run every 3 minutes
const task = cron.schedule("*/3 * * * *", startContest, {
  timezone: "Asia/Kolkata",
});

console.log("[cron] Scheduled job to run every 3 minutes (*/3 * * * *).");
console.log("[cron] Running once immediately on startup...");

startContest().catch((err) => {
  console.error("[cron] Error running initial contest on startup:", err);
});
