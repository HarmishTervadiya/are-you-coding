import { motion, AnimatePresence } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import type { Participant } from "../hooks/useContest";

interface LeaderboardProps {
  participants: Participant[];
}

const getRankStyles = (index: number) => {
  switch (index) {
    case 0:
      return "bg-gradient-to-r from-white/15 to-white/5 text-white border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.15)]";
    case 1:
      return "bg-gradient-to-r from-slate-300/10 to-slate-300/5 text-slate-200 border-slate-300/30";
    case 2:
      return "bg-gradient-to-r from-zinc-500/10 to-zinc-500/5 text-zinc-300 border-zinc-500/25";
    default:
      return "bg-white/[0.01] text-gray-400 border-white/5";
  }
};

const getRankIcon = (index: number) => {
  if (index === 0) return <Trophy className="w-5 h-5 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] animate-pulse" />;
  if (index < 3) return <Award className="w-5 h-5 text-slate-300" />;
  return <span className="font-mono text-sm">{index + 1}</span>;
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ participants }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2 font-gaming uppercase">
          <Trophy className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
          Live Rankings
        </h2>
        <span className="text-xs text-slate-200 font-mono bg-white/10 px-2.5 py-1 rounded-full border border-white/20 shadow-inner">
          {participants.length} Active
        </span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
        <div className="space-y-2 relative">
          <AnimatePresence initial={false}>
            {participants.map((user, index) => (
              <motion.div
                key={user.username}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  layout: { duration: 0.4, type: "spring" }
                }}
                className={`flex items-center justify-between p-3 rounded-xl border backdrop-blur-md transition-colors hover:bg-white/10 ${getRankStyles(index)}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-current/20 font-bold font-gaming">
                    {getRankIcon(index)}
                  </div>

                  <img
                    src={`https://github.com/${user.username}.png?size=64`}
                    alt={user.username}
                    onError={(e) => {
                      e.currentTarget.src = `https://unavatar.io/github/${user.username}`;
                    }}
                    className="w-9 h-9 rounded-lg border border-white/15 bg-black/80"
                  />

                  <a
                    href={`https://github.com/${user.username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-gray-200 hover:text-white transition-colors text-sm hover:underline"
                  >
                    {user.username}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <motion.span
                    key={user.score}
                    initial={{ scale: 1.3, color: "#94a3b8" }}
                    animate={{ scale: 1, color: "#ffffff" }}
                    className="font-mono font-bold text-white text-base drop-shadow"
                  >
                    {user.score}
                  </motion.span>
                  <span className="text-[10px] font-mono text-gray-400">pts</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {participants.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <span className="text-sm">No active participants.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
