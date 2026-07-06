import React from "react";
import { AnimatePresence } from "framer-motion";
import { ArenaBadge } from "./ArenaBadge";
import type { Participant, LiveEvent } from "../hooks/useContest";
import { Sparkles, Zap, Trophy, Swords } from "lucide-react";

interface ArenaProps {
  participants: Participant[];
  events: LiveEvent[];
  contestState: "WAITING" | "ACTIVE";
}

export const Arena: React.FC<ArenaProps> = ({ participants, events, contestState }) => {
  if (contestState === "WAITING") {
    return (
      <div className="w-full h-full min-h-[480px] flex flex-col items-center justify-center relative overflow-hidden rounded-2xl glass-panel border border-white/20 p-8 text-center">
        <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-transparent pointer-events-none animate-pulse" />
        
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-white/20 via-slate-400/20 to-zinc-600/10 border border-white/40 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(255,255,255,0.3)] animate-bounce">
          <Swords className="w-10 h-10 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] animate-pulse" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-gaming tracking-wider uppercase bg-gradient-to-r from-white via-slate-200 to-zinc-400 text-transparent bg-clip-text mb-3">
          Arena Resetting
        </h2>
        <p className="text-gray-400 max-w-md text-sm sm:text-base font-mono">
          Previous combat round concluded. Preparing the obsidian battleground and spawning combatants for the next round...
        </p>

        <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-slate-200 font-mono text-xs tracking-widest uppercase animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.15)]">
          <Sparkles className="w-4 h-4 text-white" />
          <span>Awaiting Contenders</span>
        </div>
      </div>
    );
  }

  if (participants.length === 0) {
    return (
      <div className="w-full h-full min-h-[480px] flex flex-col items-center justify-center rounded-2xl glass-panel border border-white/10 p-8 text-center">
        <Zap className="w-12 h-12 text-slate-400/50 mb-4 animate-pulse" />
        <span className="text-gray-400 font-gaming text-lg tracking-wider uppercase">No Combatants in Arena</span>
        <span className="text-gray-600 text-xs font-mono mt-1">Waiting for initial GitHub activity log broadcast...</span>
      </div>
    );
  }

  // Tiered organic arena formations based on rank standing
  const leader = participants[0];
  const flanks = participants.slice(1, 3);
  const vanguard = participants.slice(3, 6);
  const rearguard = participants.slice(6, 10);

  const getParticipantEvent = (username: string) => {
    return events.find((e) => e.member === username);
  };

  return (
    <div className="w-full h-full min-h-[520px] relative overflow-hidden rounded-2xl glass-panel border border-white/15 p-6 sm:p-8 flex flex-col justify-between select-none">
      {/* Background Arena Lighting & Obsidian Floor Markings */}
      <div className="absolute inset-0 bg-radial from-white/10 via-slate-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full border border-white/10 opacity-30 pointer-events-none border-dashed animate-[spin_60s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full border border-slate-400/10 opacity-20 pointer-events-none animate-[spin_40s_linear_infinite_reverse]" />

      {/* Floating Arena LED Booster Orbs (Visual Gameplay Decor) */}
      <div className="absolute top-12 left-16 w-3 h-3 rounded-full bg-white/80 blur-[2px] shadow-[0_0_10px_#ffffff] animate-float pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-4 h-4 rounded-full bg-slate-300/80 blur-[2px] shadow-[0_0_12px_#cbd5e1] animate-float-reverse pointer-events-none" />
      <div className="absolute top-1/3 right-12 w-2.5 h-2.5 rounded-full bg-zinc-400/80 blur-[1px] shadow-[0_0_8px_#a1a1aa] animate-float pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-3.5 h-3.5 rounded-full bg-white/80 blur-[2px] shadow-[0_0_10px_#ffffff] animate-float-reverse pointer-events-none" />

      {/* Arena Stage Header Overlay */}
      <div className="flex items-center justify-between z-20 pointer-events-none mb-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
          <span className="font-gaming text-xs sm:text-sm tracking-widest text-slate-200 uppercase font-bold drop-shadow">
            Obsidian Battle Stage
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/15 font-mono text-[11px] text-gray-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>{participants.length} Contenders Active</span>
        </div>
      </div>

      {/* Open Scattered Arena Formations */}
      <div className="flex-1 flex flex-col justify-center gap-6 sm:gap-8 my-4 relative z-20">
        <AnimatePresence mode="popLayout">
          {/* TIER 1: Apex Leader (Center Top) */}
          {leader && (
            <div className="flex justify-center items-center w-full relative">
              <div className="absolute -top-4 font-gaming text-[10px] tracking-widest text-white font-extrabold uppercase bg-white/15 px-3 py-0.5 rounded-full border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                ★ Arena Leader ★
              </div>
              <ArenaBadge
                key={leader.username}
                username={leader.username}
                rank={0}
                lastEventType={getParticipantEvent(leader.username)?.type}
                lastEventId={getParticipantEvent(leader.username)?.id}
              />
            </div>
          )}

          {/* TIER 2: Flanking Challengers (Ranks 2 & 3) */}
          {flanks.length > 0 && (
            <div className="flex justify-around items-center w-full max-w-2xl mx-auto px-4 sm:px-12 -mt-2">
              {flanks.map((user, idx) => {
                const rank = idx + 1;
                const ev = getParticipantEvent(user.username);
                return (
                  <div key={user.username} className={`transform ${idx === 0 ? "-translate-y-2 translate-x-2 sm:translate-x-6" : "-translate-y-2 -translate-x-2 sm:-translate-x-6"}`}>
                    <ArenaBadge
                      username={user.username}
                      rank={rank}
                      lastEventType={ev?.type}
                      lastEventId={ev?.id}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* TIER 3: Mid Vanguard (Ranks 4 - 6) */}
          {vanguard.length > 0 && (
            <div className="flex justify-center flex-wrap items-center gap-8 sm:gap-16 w-full max-w-3xl mx-auto px-2 mt-2">
              {vanguard.map((user, idx) => {
                const rank = idx + 3;
                const ev = getParticipantEvent(user.username);
                return (
                  <div key={user.username} className={`transform ${idx % 2 === 0 ? "translate-y-2" : "-translate-y-2"}`}>
                    <ArenaBadge
                      username={user.username}
                      rank={rank}
                      lastEventType={ev?.type}
                      lastEventId={ev?.id}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* TIER 4: Rearguard Contenders (Ranks 7 - 10) */}
          {rearguard.length > 0 && (
            <div className="flex justify-center flex-wrap items-center gap-6 sm:gap-12 w-full max-w-4xl mx-auto px-2 mt-2 opacity-90">
              {rearguard.map((user, idx) => {
                const rank = idx + 6;
                const ev = getParticipantEvent(user.username);
                return (
                  <div key={user.username} className="transform hover:scale-105 transition-transform">
                    <ArenaBadge
                      username={user.username}
                      rank={rank}
                      lastEventType={ev?.type}
                      lastEventId={ev?.id}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Stage Footer */}
      <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 border-t border-white/10 pt-3 z-20 pointer-events-none">
        <span>⚔️ Badges react dynamically to live GitHub events</span>
        <span className="hidden sm:inline">Rankings update in real-time</span>
      </div>
    </div>
  );
};
