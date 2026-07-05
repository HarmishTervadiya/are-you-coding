import { Server } from "socket.io";
import { subscriber } from "./redis";
import { redisKeys } from "./constants";

export function initSocketServer(server: any) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "*",
    },
  });

  subscriber.on("message", (channel, message) => {
    if (channel === redisKeys.LIVE_CHANNEL) {
      try {
        const parsedMessage = JSON.parse(message);
        io.emit("leaderboard_update", parsedMessage);
      } catch (err) {
        console.error("[PubSub] Failed to parse message JSON:", err);
      }
    }
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}
