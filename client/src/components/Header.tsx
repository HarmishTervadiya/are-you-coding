import { useEffect, useState } from "react";
import { ShieldAlert, ShieldCheck, Swords } from "lucide-react";

interface HeaderProps {
  activeContestId: string | null;
  socketConnected: boolean;
  contestState?: "WAITING" | "ACTIVE";
  phaseEndTime?: number | null;
}

export const Header: React.FC<HeaderProps> = ({ activeContestId, socketConnected, contestState = "ACTIVE", phaseEndTime }) => {
  const [timeLeft, setTimeLeft] = useState(180);
  const [progress, setProgress] = useState(100);
  const [displayState, setDisplayState] = useState(contestState);

  useEffect(() => {
    const updateTimer = () => {
      let remainingMs = 0;
      let totalMs = 150000;
      let current = contestState;

      if (phaseEndTime) {
        remainingMs = Math.max(0, phaseEndTime - Date.now());
        totalMs = contestState === "WAITING" ? 30000 : 150000;
      } else {
        const cycleMs = 180000;
        const elapsedInCycle = Date.now() % cycleMs;
        if (elapsedInCycle < 30000) {
           current = "WAITING";
           remainingMs = 30000 - elapsedInCycle;
           totalMs = 30000;
        } else {
           current = "ACTIVE";
           remainingMs = 180000 - elapsedInCycle;
           totalMs = 150000;
        }
      }
      
      setDisplayState(current);
      setTimeLeft(Math.ceil(remainingMs / 1000));
      setProgress((remainingMs / totalMs) * 100);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [phaseEndTime, contestState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <header className="flex flex-col gap-3 p-4 glass-panel rounded-2xl shadow-glow-primary border border-white/15">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/15 via-slate-400/10 to-zinc-500/10 border border-white/30 flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-pulse">
            <Swords className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-zinc-400 text-transparent bg-clip-text m-0 leading-none font-gaming uppercase">
              DevArena Battleground
            </h1>
            <p className="text-xs text-gray-400 mt-1 font-mono">
              Live GitHub Multiplayer Arena
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 text-xs font-mono">
            {displayState === "WAITING" ? (
              <span className="text-slate-200 font-bold animate-pulse flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                Next Arena Starting...
              </span>
            ) : (
              <>
                <span className="text-gray-400">Arena Phase:</span>
                <span className="text-white font-bold">{activeContestId || "Loading..."}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-black/60 text-xs font-mono shadow-inner">
            <span className="text-gray-400">{displayState === "WAITING" ? "Starts In:" : "Ends In:"}</span>
            <span className="text-white font-bold text-sm text-slate-200">{formatTime(timeLeft)}</span>
          </div>

          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono ${
              socketConnected
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-rose-500/10 border-rose-500/20 text-rose-400"
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

      <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden flex border border-white/10">
        <div
          className={`h-full transition-all duration-1000 ease-linear rounded-full ${
            displayState === "WAITING" 
              ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]" 
              : "bg-gradient-to-r from-white via-slate-300 to-zinc-500 shadow-[0_0_12px_rgba(255,255,255,0.6)]"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
};
