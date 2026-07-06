import React, { useEffect, useRef } from "react";

export interface ArenaBadgeProps {
  username: string;
  rank: number; // 0-indexed rank
  lastEventType?: string;
  lastEventId?: string;
}

const getRingStyle = (rank: number) => {
  switch (rank) {
    case 0:
      // Legendary Platinum / Diamond Ring
      return {
        borderClass: "border-white bg-gradient-to-b from-white via-slate-300 to-slate-500",
        glowColor: "rgba(255, 255, 255, 0.7)",
        ringDecor: "from-white/50 via-slate-200/20 to-slate-500/50",
      };
    case 1:
      // Mythic Polished Silver / Steel Ring
      return {
        borderClass: "border-slate-300 bg-gradient-to-b from-slate-200 via-slate-400 to-zinc-600",
        glowColor: "rgba(203, 213, 225, 0.5)",
        ringDecor: "from-slate-300/40 via-slate-400/10 to-zinc-600/40",
      };
    case 2:
      // Epic Dark Gunmetal Ring
      return {
        borderClass: "border-zinc-400 bg-gradient-to-b from-zinc-300 via-zinc-500 to-neutral-700",
        glowColor: "rgba(161, 161, 170, 0.45)",
        ringDecor: "from-zinc-400/40 via-zinc-500/10 to-neutral-700/40",
      };
    default:
      // Sleek Obsidian / Metallic Carbon Ring
      return {
        borderClass: "border-white/20 bg-gradient-to-b from-zinc-700 via-neutral-900 to-black",
        glowColor: "rgba(255, 255, 255, 0.2)",
        ringDecor: "from-white/20 via-transparent to-black/60",
      };
  }
};

const ArenaBadgeComponent: React.FC<ArenaBadgeProps> = ({
  username,
  rank,
  lastEventType,
  lastEventId,
}) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);

  const ringStyle = getRingStyle(rank);

  // High-performance useRef animation when an event occurs
  useEffect(() => {
    if (!lastEventId || !badgeRef.current) return;

    const badge = badgeRef.current;
    
    // Trigger action pop via direct DOM manipulation to avoid React re-renders
    badge.style.transition = "transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    
    let popTransform = "scale(1.25) rotate(3deg)";
    if (lastEventType === "CreateEvent") popTransform = "scale(1.35) rotate(15deg)";
    else if (lastEventType === "PullRequestEvent") popTransform = "scale(1.3) translateY(-8px)";
    else if (lastEventType === "IssuesEvent") popTransform = "scale(1.28) scaleY(0.9)";
    
    badge.style.transform = popTransform;
    
    // Intensify glow temporarily
    badge.style.setProperty("--ring-glow", ringStyle.glowColor.replace("0.5", "0.9").replace("0.7", "1.0").replace("0.2", "0.6"));

    // Trigger shockwave ring
    if (shockwaveRef.current) {
      const sw = shockwaveRef.current;
      sw.style.animation = "none";
      void sw.offsetWidth; // force reflow
      sw.style.animation = "shockwave 0.7s ease-out forwards";
    }

    const timer = setTimeout(() => {
      if (badge) {
        badge.style.transition = "transform 0.4s ease-out";
        badge.style.transform = "scale(1) rotate(0deg)";
        badge.style.setProperty("--ring-glow", ringStyle.glowColor);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [lastEventId, lastEventType, ringStyle.glowColor]);

  // Determine avatar size based on rank (top ranks are slightly larger in the arena)
  const sizeClass = rank === 0 ? "w-24 h-24 sm:w-28 sm:h-28" : rank < 3 ? "w-20 h-20 sm:w-24 sm:h-24" : "w-16 h-16 sm:w-20 sm:h-20";

  return (
    <div
      className={`relative flex items-center justify-center cursor-pointer select-none ${rank % 2 === 0 ? "animate-float" : "animate-float-reverse"}`}
      style={{ "--ring-glow": ringStyle.glowColor } as React.CSSProperties}
    >
      {/* Shockwave Ring for VFX */}
      <div
        ref={shockwaveRef}
        className="absolute inset-0 rounded-full border-2 border-white opacity-0 pointer-events-none z-0 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
      />

      {/* Outer Glowing RPG Token Ring */}
      <div
        ref={badgeRef}
        className={`relative ${sizeClass} rounded-full p-[3px] shadow-2xl ring-glow-effect ${ringStyle.borderClass} transition-all duration-300 z-10 flex items-center justify-center`}
      >
        {/* Inner Metallic Rim Decor */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${ringStyle.ringDecor} pointer-events-none z-20 shadow-inner`} />

        {/* User Profile Avatar (Strictly No Text, Clean Circular Badge) */}
        <div className="w-full h-full rounded-full overflow-hidden bg-black/90 border-2 border-black/80 relative z-10">
          <img
            src={`https://github.com/${username}.png?size=128`}
            alt={username}
            onError={(e) => {
              e.currentTarget.src = `https://unavatar.io/github/${username}`;
            }}
            className="w-full h-full object-cover rounded-full transform hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Subtle lighting shine arc across top right of badge */}
        <div className="absolute top-1 right-2 w-1/3 h-1/4 bg-white/30 rounded-full blur-[1px] transform -rotate-45 pointer-events-none z-30" />
      </div>
    </div>
  );
};

// Memoize to prevent unnecessary re-renders unless rank or latest event changes
export const ArenaBadge = React.memo(ArenaBadgeComponent, (prev, next) => {
  return (
    prev.username === next.username &&
    prev.rank === next.rank &&
    prev.lastEventId === next.lastEventId
  );
});
