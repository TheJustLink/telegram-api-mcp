/**
 * Two-level rate limiter: global (per second) + per-chat (per minute).
 * Uses token bucket algorithm with async mutex to prevent race conditions.
 */
export declare class RateLimiter {
    private globalTokens;
    private globalMax;
    private globalLastRefill;
    private chatBuckets;
    private chatMax;
    /** Async mutex: serializes all acquire calls to prevent race conditions */
    private queue;
    constructor(globalPerSecond: number, perChatPerMinute: number);
    /**
     * Wait until a request to the given chat is allowed.
     * Serialized via promise chain — no concurrent access to token state.
     */
    acquire(chatId?: string): Promise<number>;
    private acquireGlobal;
    private refillGlobal;
    private acquireChat;
    /** Clean up stale per-chat buckets (call periodically). */
    cleanup(): void;
}
//# sourceMappingURL=rate-limiter.d.ts.map