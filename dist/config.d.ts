/**
 * Server configuration from environment variables.
 */
export interface Config {
    /** Telegram Bot token from @BotFather */
    botToken: string;
    /** Default chat_id for all tools (optional) */
    defaultChatId?: string;
    /** Default message_thread_id for forum topics (optional) */
    defaultThreadId?: number;
    /** Global rate limit: max requests per second (default: 30, Telegram FAQ limit) */
    globalRateLimit: number;
    /** Per-chat rate limit: max messages per minute to same group (default: 20, Telegram FAQ limit) */
    perChatRateLimit: number;
    /** Max retry attempts on transient errors (default: 3) */
    maxRetries: number;
    /** Circuit breaker: consecutive failures to open circuit (default: 5) */
    circuitBreakerThreshold: number;
    /** Circuit breaker: cooldown in ms before half-open (default: 30000) */
    circuitBreakerCooldown: number;
    /** Allowed directories for file uploads (comma-separated, empty = no restriction) */
    allowedUploadDirs: string[];
    /** Max file size in bytes (default: 50MB) */
    maxFileSize: number;
    /** Run in meta-mode with 2 tools instead of all (default: false) */
    metaMode: boolean;
}
export declare function loadConfig(): Config;
//# sourceMappingURL=config.d.ts.map