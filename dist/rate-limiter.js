/**
 * Two-level rate limiter: global (per second) + per-chat (per minute).
 * Uses token bucket algorithm with async mutex to prevent race conditions.
 */
export class RateLimiter {
    globalTokens;
    globalMax;
    globalLastRefill;
    chatBuckets = new Map();
    chatMax;
    /** Async mutex: serializes all acquire calls to prevent race conditions */
    queue = Promise.resolve();
    constructor(globalPerSecond, perChatPerMinute) {
        this.globalMax = globalPerSecond;
        this.globalTokens = globalPerSecond;
        this.globalLastRefill = Date.now();
        this.chatMax = perChatPerMinute;
    }
    /**
     * Wait until a request to the given chat is allowed.
     * Serialized via promise chain — no concurrent access to token state.
     */
    async acquire(chatId) {
        return new Promise((resolve) => {
            this.queue = this.queue.then(async () => {
                let totalWait = 0;
                totalWait += await this.acquireGlobal();
                if (chatId) {
                    totalWait += await this.acquireChat(String(chatId));
                }
                resolve(totalWait);
            });
        });
    }
    async acquireGlobal() {
        this.refillGlobal();
        if (this.globalTokens >= 1) {
            this.globalTokens -= 1;
            return 0;
        }
        const waitMs = Math.ceil(1000 / this.globalMax);
        await sleep(waitMs);
        this.refillGlobal();
        this.globalTokens = Math.max(0, this.globalTokens - 1);
        return waitMs;
    }
    refillGlobal() {
        const now = Date.now();
        const elapsed = now - this.globalLastRefill;
        const refill = (elapsed / 1000) * this.globalMax;
        this.globalTokens = Math.min(this.globalMax, this.globalTokens + refill);
        this.globalLastRefill = now;
    }
    async acquireChat(chatId) {
        let bucket = this.chatBuckets.get(chatId);
        if (!bucket) {
            bucket = { tokens: this.chatMax, lastRefill: Date.now() };
            this.chatBuckets.set(chatId, bucket);
        }
        const now = Date.now();
        const elapsed = now - bucket.lastRefill;
        const refill = (elapsed / 60000) * this.chatMax;
        bucket.tokens = Math.min(this.chatMax, bucket.tokens + refill);
        bucket.lastRefill = now;
        if (bucket.tokens >= 1) {
            bucket.tokens -= 1;
            return 0;
        }
        const waitMs = Math.ceil(60000 / this.chatMax);
        await sleep(waitMs);
        // Re-refill after sleep (time passed, new tokens available)
        const nowAfter = Date.now();
        const elapsedAfter = nowAfter - bucket.lastRefill;
        const refillAfter = (elapsedAfter / 60000) * this.chatMax;
        bucket.tokens = Math.min(this.chatMax, bucket.tokens + refillAfter);
        bucket.lastRefill = nowAfter;
        bucket.tokens = Math.max(0, bucket.tokens - 1);
        return waitMs;
    }
    /** Clean up stale per-chat buckets (call periodically). */
    cleanup() {
        const cutoff = Date.now() - 120_000;
        for (const [chatId, bucket] of this.chatBuckets) {
            if (bucket.lastRefill < cutoff) {
                this.chatBuckets.delete(chatId);
            }
        }
    }
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
//# sourceMappingURL=rate-limiter.js.map