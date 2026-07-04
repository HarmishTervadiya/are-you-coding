export const redisKeys = {
    CONTEST_QUEUE_KEY: "contest-events",
    ACTIVE_CONTEST_ID_KEY: "contest:active_id",
    LEADERBOARD_KEY: (contestId: string) => `contest:${contestId}:leaderboard`,
    HISTORY_KEY: "contest:history",
    TOTAL_CONTEST: "totalcontest"
}