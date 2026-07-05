import { motion, AnimatePresence } from "framer-motion";
import { Activity, ExternalLink, GitBranch, GitCommit, GitPullRequest, PlusCircle } from "lucide-react";
import type { LiveEvent } from "../hooks/useContest";

interface LiveActivityFeedProps {
  events: LiveEvent[];
}

const getEventBadge = (type: string) => {
  switch (type) {
    case "PushEvent":
      return {
        label: "Push",
        points: "+5",
        color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        icon: <GitCommit className="w-3.5 h-3.5" />
      };
    case "PullRequestEvent":
      return {
        label: "PR Open",
        points: "+15",
        color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        icon: <GitPullRequest className="w-3.5 h-3.5" />
      };
    case "IssuesEvent":
      return {
        label: "Issue",
        points: "+10",
        color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        icon: <GitBranch className="w-3.5 h-3.5" />
      };
    case "CreateEvent":
      return {
        label: "Repo Create",
        points: "+30",
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        icon: <PlusCircle className="w-3.5 h-3.5" />
      };
    default:
      return {
        label: type.replace("Event", ""),
        points: "+10",
        color: "text-gray-400 bg-gray-500/10 border-gray-500/20",
        icon: <Activity className="w-3.5 h-3.5" />
      };
  }
};

export const LiveActivityFeed: React.FC<LiveActivityFeedProps> = ({ events }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
          Live Activity Feed
        </h2>
        <span className="text-xs text-gray-500 font-mono">
          Real-Time
        </span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {events.map((event, idx) => {
              const badge = getEventBadge(event.type);
              const key = `${event.contestId}-${event.member}-${idx}`;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 bg-gray-900/40 border border-gray-800 rounded-xl flex flex-col gap-2 hover:bg-gray-900/60 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://github.com/${event.member}.png?size=32`}
                          alt={event.member}
                          className="w-5 h-5 rounded-md border border-gray-800"
                        />
                        <a
                          href={event.memberUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-gray-300 hover:text-purple-400 hover:underline"
                        >
                          {event.member}
                        </a>
                      </div>

                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-mono ${badge.color}`}>
                        {badge.icon}
                        <span>{badge.label}</span>
                        <span className="font-bold border-l border-current/25 pl-1.5 ml-1">{badge.points}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-1 overflow-hidden pr-2">
                        <span className="text-gray-600">on</span>
                        <a
                          href={event.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-gray-300 hover:text-purple-400 truncate hover:underline flex items-center gap-0.5"
                        >
                          {event.repoName}
                          <ExternalLink className="w-2.5 h-2.5 inline-block opacity-50" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {events.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500 text-sm">
              <Activity className="w-8 h-8 text-gray-700 mb-2 animate-pulse" />
              <span>Waiting for GitHub activity logs...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
