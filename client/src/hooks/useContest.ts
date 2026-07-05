import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

const API_BASE = "http://localhost:3000";

export interface Participant {
  username: string;
  score: number;
}

export interface LiveEvent {
  contestId: string;
  type: string;
  member: string;
  memberUrl: string;
  repoName: string;
  repoUrl: string;
}

export interface HistoryContest {
  contestId: string;
  endedAt: number;
  winner: string;
  rankings: Participant[];
}

export function useContest() {
  const [activeContestId, setActiveContestId] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<Participant[]>([]);
  const [eventsFeed, setEventsFeed] = useState<LiveEvent[]>([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [history, setHistory] = useState<HistoryContest[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const socketRef = useRef<Socket | null>(null);

  const fetchActiveLeaderboard = async () => {
    try {
      const res = await fetch(`${API_BASE}/leaderboard`);
      if (res.ok) {
        const data = await res.json();
        setActiveContestId(data.contestId);
        setLeaderboard(data.leaderboard || []);
      }
    } catch (err) {
      console.error("Error fetching active leaderboard:", err);
    }
  };

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch(`${API_BASE}/history?limit=10&offset=0`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
      }
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch on mount
    fetchActiveLeaderboard();
    fetchHistory();

    const connectSocket = () => {
      if (socketRef.current?.connected) return;

      const socket = io(API_BASE, {
        transports: ["websocket"],
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        setSocketConnected(true);
        // Refresh leaderboard on reconnection to catch up
        fetchActiveLeaderboard();
      });

      socket.on("disconnect", () => {
        setSocketConnected(false);
      });

      socket.on("leaderboard_update", (data: { event: LiveEvent; currentRankings: Participant[] }) => {
        if (data.event) {
          // Update active contest ID if changed
          setActiveContestId(data.event.contestId);
          // Add event to feed, cap at 30 items
          setEventsFeed((prev) => [data.event, ...prev].slice(0, 30));
        }
        if (data.currentRankings) {
          setLeaderboard(data.currentRankings);
        }
      });
    };

    const disconnectSocket = () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocketConnected(false);
      }
    };

    // Handle Page Visibility Throttling (efficient-background-processing)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("[useContest] Tab inactive. Disconnecting socket to conserve resources.");
        disconnectSocket();
      } else {
        console.log("[useContest] Tab active. Reconnecting and refreshing state.");
        fetchActiveLeaderboard();
        fetchHistory();
        connectSocket();
      }
    };

    // Connect initially if visible
    if (!document.hidden) {
      connectSocket();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      disconnectSocket();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return {
    activeContestId,
    leaderboard,
    eventsFeed,
    socketConnected,
    history,
    historyLoading,
    refetchHistory: fetchHistory,
  };
}
