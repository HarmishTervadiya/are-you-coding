import { useState } from "react";
import { motion } from "framer-motion";
import { History, Calendar, Award, User, ChevronRight, ChevronDown } from "lucide-react";
import type { HistoryContest } from "../hooks/useContest";

interface HistoryPanelProps {
  contests: HistoryContest[];
  loading: boolean;
  onRefresh: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ contests, loading, onRefresh }) => {
  const [selectedContestId, setSelectedContestId] = useState<string | null>(null);

  const selectedContest = contests.find((c) => c.contestId === selectedContestId);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <History className="w-5 h-5 text-white animate-pulse" />
          Contest History
        </h2>
        <motion.button
          onClick={onRefresh}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xs text-slate-300 hover:text-white font-medium cursor-pointer"
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh"}
        </motion.button>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto custom-scrollbar pr-1">
        {/* List Card */}
        <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full p-4 rounded-xl border border-white/5 bg-white/[0.01] animate-pulse flex justify-between items-center">
                <div className="space-y-2 flex-1 pr-4">
                  <div className="h-4 bg-white/10 rounded w-1/3" />
                  <div className="h-2 bg-white/5 rounded w-1/4" />
                </div>
                <div className="w-4 h-4 bg-white/10 rounded" />
              </div>
            ))
          ) : (
            contests.map((contest) => (
              <button
                key={contest.contestId}
                onClick={() => setSelectedContestId(
                  selectedContestId === contest.contestId ? null : contest.contestId
                )}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                  selectedContestId === contest.contestId
                    ? "bg-white/10 border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                    : "bg-white/[0.01] border-white/5 text-gray-400 hover:bg-white/[0.03] hover:text-gray-200"
                }`}
              >
                <div className="space-y-1">
                  <div className="font-mono text-sm font-semibold flex items-center gap-1.5 text-white">
                    {contest.contestId}
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-gray-400 font-normal">
                      Winner: {contest.winner}
                    </span>
                  </div>
                  <div className="text-[10px] flex items-center gap-1 text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {formatDate(contest.endedAt)}
                  </div>
                </div>
                <div>
                  {selectedContestId === contest.contestId ? (
                    <ChevronDown className="w-4 h-4 text-white" />
                  ) : (
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  )}
                </div>
              </button>
            ))
          )}

          {contests.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500 text-sm">
              <span>No completed contests found.</span>
            </div>
          )}
        </div>

        {/* Details Card */}
        <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3 flex flex-col h-[300px]">
          {selectedContest ? (
            <div className="flex flex-col h-full">
              <div className="border-b border-white/5 pb-2 mb-2">
                <h3 className="font-mono font-bold text-sm text-white">
                  Rankings for {selectedContest.contestId}
                </h3>
                <div className="text-[10px] text-gray-500 mt-0.5">
                  Ended on {formatDate(selectedContest.endedAt)}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1">
                {selectedContest.rankings.map((user, idx) => (
                  <div
                    key={user.username}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/[0.01] border border-white/5 text-xs hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-white/10 text-slate-300 flex items-center justify-center font-mono font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <a 
                        href={`https://github.com/${user.username}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={`https://github.com/${user.username}.png?size=32`}
                          alt={user.username}
                          onError={(e) => {
                            e.currentTarget.src = `https://unavatar.io/github/${user.username}`;
                          }}
                          className="w-4 h-4 rounded border border-white/10"
                        />
                        <span className="font-medium text-gray-300 hover:text-white hover:underline">{user.username}</span>
                      </a>
                      {selectedContest.winner === user.username && (
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                      )}
                    </div>
                    <span className="font-mono text-gray-400">{user.score} pts</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 text-sm text-center">
              <User className="w-8 h-8 text-gray-700 mb-2" />
              <span>Select a contest from the list to view its final standings.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
