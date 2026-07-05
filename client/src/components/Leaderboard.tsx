import { motion, AnimatePresence } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import type { Participant } from "../hooks/useContest";

interface LeaderboardProps {
  participants: Participant[];
}

const getRankStyles = (index: number) => {
  switch (index) {
    case 0:
      return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    case 1:
      return "bg-slate-400/10 text-slate-300 border-slate-400/30";
    case 2:
      return "bg-amber-700/10 text-amber-600 border-amber-700/30";
    default:
      return "bg-gray-800/20 text-gray-400 border-gray-800/30";
  }
};

const getRankIcon = (index: number) => {
  if (index === 0) return <Trophy className="w-5 h-5 text-amber-400" />;
  if (index < 3) return <Award className="w-5 h-5" />;
  return <span className="font-mono text-sm">{index + 1}</span>;
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ participants }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-purple-400" />
          Live Rankings
        </h2>
        <span className="text-xs text-gray-500 font-mono">
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
                className={`flex items-center justify-between p-3 rounded-xl border backdrop-blur-md transition-colors hover:bg-white/5 ${getRankStyles(index)}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-current/20 font-bold">
                    {getRankIcon(index)}
                  </div>

                  <img
                    src={`https://github.com/${user.username}.png?size=64`}
                    alt={user.username}
                    onError={(e) => {
                      e.currentTarget.src = `https://unavatar.io/github/${user.username}`;
                    }}
                    className="w-9 h-9 rounded-lg border border-gray-700 bg-gray-900"
                  />

                  <a
                    href={`https://github.com/${user.username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-gray-200 hover:text-purple-400 transition-colors text-sm hover:underline"
                  >
                    {user.username}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <motion.span
                    key={user.score}
                    initial={{ scale: 1.2, color: "#a855f7" }}
                    animate={{ scale: 1, color: "#f3f4f6" }}
                    className="font-mono font-bold text-white text-base"
                  >
                    {user.score}
                  </motion.span>
                  <span className="text-[10px] font-mono text-gray-500">pts</span>
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
