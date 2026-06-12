/**
 * Circuit breaker to prevent cascading failures when Telegram API is down.
 *
 * States:
 * - CLOSED: normal operation, requests pass through
 * - OPEN: too many failures, requests fail immediately
 * - HALF_OPEN: cooldown expired, allow one probe request
 *
 * 429 (rate limit) does NOT count as a failure — it's expected behavior.
 */
export type CircuitState = "closed" | "open" | "half_open";
export declare class CircuitBreaker {
    private state;
    private failureCount;
    private lastFailureTime;
    private threshold;
    private cooldownMs;
    constructor(threshold: number, cooldownMs: number);
    /** Check if request is allowed. Throws if circuit is open. */
    check(): void;
    /** Record a successful response. Resets the breaker. */
    recordSuccess(): void;
    /**
     * Record a failure. Does NOT count 429 as failure.
     * Returns true if the circuit just opened.
     */
    recordFailure(statusCode?: number): boolean;
    getState(): CircuitState;
    getFailureCount(): number;
}
export declare class CircuitOpenError extends Error {
    constructor(message: string);
}
//# sourceMappingURL=circuit-breaker.d.ts.map