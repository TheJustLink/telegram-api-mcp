export class CircuitBreaker {
    state = "closed";
    failureCount = 0;
    lastFailureTime = 0;
    threshold;
    cooldownMs;
    constructor(threshold, cooldownMs) {
        this.threshold = threshold;
        this.cooldownMs = cooldownMs;
    }
    /** Check if request is allowed. Throws if circuit is open. */
    check() {
        if (this.state === "closed")
            return;
        if (this.state === "open") {
            if (Date.now() - this.lastFailureTime >= this.cooldownMs) {
                this.state = "half_open";
                return; // Allow probe request
            }
            throw new CircuitOpenError(`Circuit breaker is OPEN. ${this.failureCount} consecutive failures. ` +
                `Will retry in ${Math.ceil((this.cooldownMs - (Date.now() - this.lastFailureTime)) / 1000)}s.`);
        }
        // half_open — allow through
    }
    /** Record a successful response. Resets the breaker. */
    recordSuccess() {
        this.failureCount = 0;
        this.state = "closed";
    }
    /**
     * Record a failure. Does NOT count 429 as failure.
     * Returns true if the circuit just opened.
     */
    recordFailure(statusCode) {
        // 429 is rate limiting, not a server failure
        if (statusCode === 429)
            return false;
        this.failureCount++;
        this.lastFailureTime = Date.now();
        // In half_open, any failure immediately reopens
        if (this.state === "half_open") {
            this.state = "open";
            return true;
        }
        if (this.failureCount >= this.threshold) {
            this.state = "open";
            return true;
        }
        return false;
    }
    getState() {
        return this.state;
    }
    getFailureCount() {
        return this.failureCount;
    }
}
export class CircuitOpenError extends Error {
    constructor(message) {
        super(message);
        this.name = "CircuitOpenError";
    }
}
//# sourceMappingURL=circuit-breaker.js.map