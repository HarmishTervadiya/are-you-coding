import { useEffect, useState } from "react";
import { Activity, ShieldAlert, ShieldCheck } from "lucide-react";

interface HeaderProps {
  activeContestId: string | null;
  socketConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeContestId, socketConnected }) => {
  const [timeLeft, setTimeLeft] = useState(180); // seconds
  const [progress, setProgress] = useState(100); // percentage

  useEffect(() => {
    const updateTimer = () => {
      const contestDurationMs = 3 * 60 * 1000; // 3 minutes
      const elapsedMs = Date.now() % contestDurationMs;
      const remainingMs = contestDurationMs - elapsedMs;
      const remainingSecs = Math.ceil(remainingMs / 1000);
      
      setTimeLeft(remainingSecs);
      setProgress((remainingMs / contestDurationMs) * 100);
    };

    updateTimer(); // initial call
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <header className="flex flex-col gap-3 p-5 bg-gray-900/30 border border-gray-800 rounded-2xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white m-0 leading-none">
              DevArena Leaderboard
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-mono">
              Live GitHub activity contest tracker
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Active Contest Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-800 bg-gray-900/60 text-xs font-mono">
            <span className="text-gray-500">Active Contest:</span>
            <span className="text-purple-400 font-bold">{activeContestId || "Loading..."}</span>
          </div>

          {/* Timer Display */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-800 bg-gray-900/60 text-xs font-mono">
            <span className="text-gray-500">Resets In:</span>
            <span className="text-white font-bold">{formatTime(timeLeft)}</span>
          </div>

          {/* Connection Status */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono ${
              socketConnected
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {socketConnected ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Connected</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-3.5 h-3.5 animate-bounce" />
                <span>Disconnected</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
};
