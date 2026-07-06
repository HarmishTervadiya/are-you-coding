import { motion, AnimatePresence } from "framer-motion";
import { Activity, ExternalLink, Swords, Shield, Sparkles, Trophy, Zap } from "lucide-react";
import type { LiveEvent } from "../hooks/useContest";

interface LiveActivityFeedProps {
  events: LiveEvent[];
}

const getEventBadge = (type: string) => {
  switch (type) {
    case "PushEvent":
      return {
        label: "COMMIT",
        points: "+5",
        color: "text-white bg-white/10 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.15)]",
        icon: <Swords className="w-3.5 h-3.5" />
      };
    case "PullRequestEvent":
      return {
        label: "PR OPEN",
        points: "+15",
        color: "text-slate-200 bg-slate-300/10 border-slate-300/20 shadow-[0_0_15px_rgba(203,213,225,0.15)]",
        icon: <Sparkles className="w-3.5 h-3.5" />
      };
    case "IssuesEvent":
      return {
        label: "ISSUE",
        points: "+10",
        color: "text-zinc-300 bg-zinc-400/10 border-zinc-400/20 shadow-[0_0_15px_rgba(161,161,170,0.15)]",
        icon: <Shield className="w-3.5 h-3.5" />
      };
    case "CreateEvent":
      return {
        label: "REPO CREATE",
        points: "+30",
        color: "text-white bg-gradient-to-r from-white/20 to-slate-400/20 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.25)]",
        icon: <Trophy className="w-3.5 h-3.5" />
      };
    default:
      return {
        label: type.replace("Event", "").toUpperCase(),
        points: "+10",
        color: "text-slate-400 bg-slate-500/10 border-slate-500/20 shadow-[0_0_15px_rgba(100,116,139,0.15)]",
        icon: <Zap className="w-3.5 h-3.5" />
      };
  }
};

const formatRelativeTime = (timestamp?: number) => {
  if (!timestamp) return "just now";
  const diffSecs = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSecs < 5) return "just now";
  if (diffSecs < 60) return `${diffSecs}s ago`;
  const diffMins = Math.floor(diffSecs / 60);
  if (diffMins < 60) return `${diffMins}m ago`;
  return `${Math.floor(diffMins / 60)}h ago`;
};

const getPointsColor = (type: string) => {
  switch (type) {
    case "PushEvent": return "text-white";
    case "PullRequestEvent": return "text-slate-200";
    case "IssuesEvent": return "text-zinc-300";
    case "CreateEvent": return "text-white";
    default: return "text-slate-400";
  }
};

export const LiveActivityFeed: React.FC<LiveActivityFeedProps> = ({ events }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2 font-gaming uppercase">
          <Activity className="w-5 h-5 text-white animate-pulse drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          Battle Arena logs
        </h2>
        <span className="text-xs text-slate-200 font-mono bg-white/10 px-2.5 py-1 rounded-full border border-white/20 shadow-inner">
          Live Combat
        </span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="space-y-2.5 relative">
          <AnimatePresence initial={false}>
            {events.map((event, index) => {
              const badge = getEventBadge(event.type);
              const isLatest = index === 0;

              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    layout: { duration: 0.3 }
                  }}
                  className={`p-3 rounded-xl border transition-all duration-300 group ${
                    isLatest
                      ? "bg-gradient-to-r from-white/15 to-white/5 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                      : "bg-white/[0.01] border-white/5 hover:bg-white/[0.04] hover:border-white/15"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src={`https://github.com/${event.member}.png?size=64`}
                          alt={event.member}
                          onError={(e) => {
                            e.currentTarget.src = `https://unavatar.io/github/${event.member}`;
                          }}
                          className="w-10 h-10 rounded-xl border border-white/15 bg-black/80 group-hover:border-white transition-colors"
                        />
                        <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-white border border-black"></span>
                        </span>
                      </div>

                      <div className="min-w-0 flex flex-col">
                        <div className="flex items-center gap-2">
                          <a
                            href={event.memberUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold text-gray-200 hover:text-white transition-colors text-sm truncate hover:underline"
                          >
                            {event.member}
                          </a>
                          <span className="text-[10px] text-gray-400 font-mono shrink-0">
                            {formatRelativeTime(event.timestamp)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 mt-0.5 text-xs text-gray-400">
                          <span>action on</span>
                          <a
                            href={event.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono font-medium text-slate-300 hover:text-white truncate transition-colors flex items-center gap-1 hover:underline"
                          >
                            {event.repoName}
                            <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold ${badge.color}`}>
                        {badge.icon}
                        <span>{badge.label}</span>
                      </div>

                      <motion.span
                        key={event.id}
                        initial={{ scale: 1.4 }}
                        animate={{ scale: 1 }}
                        className={`font-mono font-extrabold text-sm ${getPointsColor(event.type)} drop-shadow`}
                      >
                        {badge.points} pts
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {events.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <Activity className="w-8 h-8 mb-2 opacity-30 animate-pulse" />
              <span className="text-sm font-mono">No live battle events recorded yet.</span>
              <span className="text-xs text-gray-600 mt-1">Waiting for GitHub activity broadcast...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
