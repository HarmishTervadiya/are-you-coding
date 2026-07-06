import { Header } from "./components/Header";
import { Leaderboard } from "./components/Leaderboard";
import { LiveActivityFeed } from "./components/LiveActivityFeed";
import { HistoryPanel } from "./components/HistoryPanel";
import { Arena } from "./components/Arena";
import { useContest } from "./hooks/useContest";

function App() {
  const {
    activeContestId,
    leaderboard,
    eventsFeed,
    socketConnected,
    history,
    historyLoading,
    refetchHistory,
    contestState,
    phaseEndTime,
  } = useContest();

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        {/* Header Section */}
        <Header 
          activeContestId={activeContestId} 
          socketConnected={socketConnected}
          contestState={contestState}
          phaseEndTime={phaseEndTime}
        />

        {/* Hero Battleground Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Open Arena Stage (Left, Larger 2 Columns) */}
          <div className="lg:col-span-2 h-[560px] flex flex-col">
            <Arena 
              participants={leaderboard} 
              events={eventsFeed} 
              contestState={contestState} 
            />
          </div>

          {/* Quantitative Rankings Panel (Right Sidebar, 1 Column) */}
          <div className="lg:col-span-1 p-5 glass-panel rounded-2xl h-[560px] flex flex-col shadow-glow-primary border border-white/15">
            <Leaderboard participants={leaderboard} />
          </div>

          {/* Combat Activity Log Feed (Left 2 Columns below Arena) */}
          <div className="lg:col-span-2 p-5 glass-panel rounded-2xl h-[420px] flex flex-col shadow-glow-accent border border-white/5">
            <LiveActivityFeed events={eventsFeed} />
          </div>

          {/* History Panel (Right 1 Column below Leaderboard) */}
          <div className="lg:col-span-1 p-5 glass-panel rounded-2xl h-[420px] flex flex-col border border-white/5">
            <HistoryPanel contests={history} loading={historyLoading} onRefresh={refetchHistory} />
          </div>

        </div>

        {/* Footer */}
        <footer className="text-center text-[11px] text-gray-500 font-mono mt-2">
          DevArena Multiplayer System • Powered by Upstash Redis, BullMQ, Socket.IO & React
        </footer>
      </div>
    </div>
  );
}

export default App;
