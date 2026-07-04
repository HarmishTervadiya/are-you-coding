import "dotenv/config";
import express from "express";
import { redis } from "./redis";
import { redisKeys } from "./constants";

import "./worker";
import "./cron";

const app = express();
app.use(express.json());

app.get("/health", async (req, res) => {
  res.json({ message: "Server is running" });
});

const checkRedisStatus = async () => {
  try {
    const redisStatus = await redis.ping();
    console.log("Redis ping : " + redisStatus);
  } catch (error) {
    console.error("Redis ping failed:", error);
  }
};

app.get("/leaderboard", async (req, res) => {
  try {
    const contestId = await redis.get(redisKeys.ACTIVE_CONTEST_ID_KEY);
    if (!contestId) {
      return res.status(404).json({ error: "No active contest found" });
    }

    const leaderboardKey = redisKeys.LEADERBOARD_KEY(contestId);
    
    // Retrieve all members and their scores sorted in descending order
    const rawLeaderboard = await redis.zrevrange(leaderboardKey, 0, -1, "WITHSCORES");
    
    // Parse the flat WITHSCORES array ["username", "score", ...] into an array of objects
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

checkRedisStatus();
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
