export function loadConfig() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
        throw new Error("TELEGRAM_BOT_TOKEN is required. Get one from @BotFather: https://t.me/BotFather");
    }
    const threadId = process.env.TELEGRAM_DEFAULT_THREAD_ID;
    const uploadDirs = process.env.TELEGRAM_ALLOWED_UPLOAD_DIRS;
    return {
        botToken: token,
        defaultChatId: process.env.TELEGRAM_DEFAULT_CHAT_ID || undefined,
        defaultThreadId: threadId ? parseInt(threadId, 10) : undefined,
        globalRateLimit: parseInt(process.env.TELEGRAM_GLOBAL_RATE_LIMIT || "30", 10),
        perChatRateLimit: parseInt(process.env.TELEGRAM_PER_CHAT_RATE_LIMIT || "20", 10),
        maxRetries: parseInt(process.env.TELEGRAM_MAX_RETRIES || "3", 10),
        circuitBreakerThreshold: parseInt(process.env.TELEGRAM_CB_THRESHOLD || "5", 10),
        circuitBreakerCooldown: parseInt(process.env.TELEGRAM_CB_COOLDOWN || "30000", 10),
        allowedUploadDirs: uploadDirs ? uploadDirs.split(",").map((d) => d.trim()) : [],
        maxFileSize: parseInt(process.env.TELEGRAM_MAX_FILE_SIZE || String(50 * 1024 * 1024), 10),
        metaMode: process.env.TELEGRAM_META_MODE === "true",
    };
}
//# sourceMappingURL=config.js.map