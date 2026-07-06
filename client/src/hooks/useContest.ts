import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

const API_BASE = "http://localhost:3000";

export interface Participant {
  username: string;
  score: number;
}

export interface LiveEvent {
  id?: string;
  contestId: string;
  type: string;
  member: string;
  memberUrl: string;
  repoName: string;
  repoUrl: string;
  count?: number;
  timestamp?: number;
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
  
  const [contestState, setContestState] = useState<"WAITING" | "ACTIVE">("ACTIVE");
  const [phaseEndTime, setPhaseEndTime] = useState<number | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const contestStateRef = useRef<"WAITING" | "ACTIVE">("ACTIVE");

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

    const buffer: { event: LiveEvent; currentRankings: Participant[] }[] = [];
    let flushTimeout: any = null;

    const flushBuffer = () => {
      if (buffer.length === 0 || contestStateRef.current === "WAITING") return;

      const latestRankings = buffer[buffer.length - 1]!.currentRankings;
      const newEvents = buffer.map((b) => b.event).filter(Boolean);

      if (newEvents.length > 0) {
        setEventsFeed((prev) => {
          const updated = [...prev];
          
          for (let i = 0; i < newEvents.length; i++) {
            const ev = newEvents[i]!;
            if (updated.length > 0 && updated[0].member === ev.member && updated[0].type === ev.type) {
              updated[0] = { ...updated[0], count: (updated[0].count || 1) + 1 };
            } else {
              updated.unshift({ ...ev, id: Math.random().toString(36).substring(2, 9), count: 1 });
            }
          }
          return updated.slice(0, 30);
        });
        
        const latestEvent = newEvents[newEvents.length - 1]!;
        setActiveContestId(latestEvent.contestId);
      }

      if (latestRankings && latestRankings.length > 0) {
        setLeaderboard(latestRankings);
      }

      buffer.length = 0;
    };

    const connectSocket = () => {
      if (socketRef.current?.connected) return;

      const socket = io(API_BASE, {
        transports: ["websocket"],
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        setSocketConnected(true);
        fetchActiveLeaderboard();
      });

      socket.on("disconnect", () => {
        setSocketConnected(false);
      });

      socket.on("leaderboard_update", (data: any) => {
        if (data.type === "STATE_CHANGE") {
          setContestState(data.state);
          contestStateRef.current = data.state;
          setPhaseEndTime(Date.now() + data.durationMs);
          
          if (data.state === "WAITING") {
            buffer.length = 0;
            if (flushTimeout) {
              clearTimeout(flushTimeout);
              flushTimeout = null;
            }
            setActiveContestId(null);
            setEventsFeed([]);
            setLeaderboard([]);
            fetchHistory();
          } else if (data.state === "ACTIVE") {
            fetchActiveLeaderboard();
          }
          return;
        }

        buffer.push(data);
        if (!flushTimeout) {
          flushTimeout = setTimeout(() => {
            flushBuffer();
            flushTimeout = null;
          }, 300); // Batch updates every 300ms
        }
      });
    };

    const disconnectSocket = () => {
      if (flushTimeout) {
        clearTimeout(flushTimeout);
        flushTimeout = null;
      }
      buffer.length = 0;
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocketConnected(false);
      }
    };

    // Handle Page Visibility Throttling
    const handleVisibilityChange = () => {
      if (document.hidden) {
        disconnectSocket();
      } else {
        fetchActiveLeaderboard();
        fetchHistory();
        connectSocket();
      }
    };

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
    contestState,
    phaseEndTime,
  };
}
