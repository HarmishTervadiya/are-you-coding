import "dotenv/config";
import express from "express";
import { redis } from "./redis";
import "./worker";
import "./cron";
import http from "node:http";
import { initSocketServer } from "./socket";
import cors from "cors";
import router from "./routes"; // Import router

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST"]
}));
app.use(express.json());
app.use(router); // Mount the router

const server = http.createServer(app);

const checkRedisStatus = async () => {
  try {
    const redisStatus = await redis.ping();
    console.log("Redis ping : " + redisStatus);
  } catch (error) {
    console.error("Redis ping failed:", error);
  }
};

checkRedisStatus();
initSocketServer(server);

server.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
