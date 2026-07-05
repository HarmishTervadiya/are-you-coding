import { Router } from "express";
import { redis } from "./redis";
import { redisKeys } from "./constants";

const router = Router();

router.get("/health", async (req, res) => {
  res.json({ message: "Server is running" });
});

router.get("/leaderboard", async (req, res) => {
  try {
    const contestId = await redis.get(redisKeys.ACTIVE_CONTEST_ID_KEY);
    if (!contestId) {
      return res.status(404).json({ error: "No active contest found" });
    }

    const leaderboardKey = redisKeys.LEADERBOARD_KEY(contestId);

    const rawLeaderboard = await redis.zrevrange(
      leaderboardKey,
      0,
      -1,
      "WITHSCORES",
    );

    const leaderboard = [];
    for (let i = 0; i < rawLeaderboard.length; i += 2) {
      leaderboard.push({
        username: rawLeaderboard[i],
        score: parseInt(rawLeaderboard[i + 1] || "0", 10),
      });
    }

    res.json({
      contestId,
      leaderboard,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

router.get("/history", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string || "10", 10);
    const offset = parseInt(req.query.offset as string || "0", 10);

    const contestIds = await redis.zrevrange("contest:history:index", offset, offset + limit - 1);

    if (contestIds.length === 0) {
      return res.json({ history: [] });
    }

    const pipeline = redis.pipeline();
    contestIds.forEach((id) => {
      pipeline.hgetall(`contest:history:data:${id}`);
    });
    
    const results = await pipeline.exec();
    const history = [];

    if (results) {
      for (const [err, data] of results) {
        if (err) {
          console.error("Error fetching contest details from pipeline:", err);
          continue;
        }
        
        const contestData = data as Record<string, string>;
        if (contestData && Object.keys(contestData).length > 0) {
          history.push({
            contestId: contestData.contestId,
            endedAt: parseInt(contestData.endedAt || "0", 10),
            winner: contestData.winner,
            rankings: contestData.rankings ? JSON.parse(contestData.rankings) : [],
          });
        }
      }
    }

    res.json({ history });
  } catch (error) {
    console.error("Error fetching contest history:", error);
    res.status(500).json({ error: "Failed to fetch contest history" });
  }
});

export default router;
