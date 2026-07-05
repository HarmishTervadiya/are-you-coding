import { Header } from "./components/Header";
import { Leaderboard } from "./components/Leaderboard";
import { LiveActivityFeed } from "./components/LiveActivityFeed";
import { HistoryPanel } from "./components/HistoryPanel";
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
  } = useContest();

  return (
    <div className="min-h-screen bg-[#07080b] py-6 px-4 sm:px-6 lg:px-8 flex flex-col gap-6 text-gray-200">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        {/* Header Section */}
        <Header activeContestId={activeContestId} socketConnected={socketConnected} />

        {/* Bento Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Leaderboard Panel */}
          <div className="lg:col-span-2 p-5 bg-gray-900/10 border border-gray-800/80 rounded-2xl backdrop-blur-md h-[550px] flex flex-col">
            <Leaderboard participants={leaderboard} />
          </div>

          {/* Activity Feed Panel */}
          <div className="lg:col-span-1 p-5 bg-gray-900/10 border border-gray-800/80 rounded-2xl backdrop-blur-md h-[550px] flex flex-col">
            <LiveActivityFeed events={eventsFeed} />
          </div>

          {/* History Panel */}
          <div className="lg:col-span-3 p-5 bg-gray-900/10 border border-gray-800/80 rounded-2xl backdrop-blur-md flex flex-col">
            <HistoryPanel contests={history} loading={historyLoading} onRefresh={refetchHistory} />
          </div>

        </div>

        {/* Footer */}
        <footer className="text-center text-[10px] text-gray-600 font-mono mt-4">
          Powered by Upstash Redis, BullMQ, Socket.IO and React
        </footer>
      </div>
    </div>
  );
}

export default App;
