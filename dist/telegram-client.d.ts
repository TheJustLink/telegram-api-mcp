import { Config } from "./config.js";
export declare class TelegramClient {
    private baseUrl;
    private token;
    private rateLimiter;
    private circuitBreaker;
    private config;
    private cleanupInterval;
    constructor(config: Config);
    destroy(): void;
    call(method: string, params?: Record<string, unknown>): Promise<unknown>;
    private applyDefaults;
    private callWithRetry;
    private callJson;
    private callMultipart;
    private handleResponse;
    private hasFileParams;
    private isLocalFile;
    private readLocalFile;
    /** Download a file by file_id. Returns the local path. */
    downloadFile(fileId: string, destDir: string): Promise<string>;
}
export declare class TelegramApiError extends Error {
    statusCode?: number;
    retryAfter?: number;
    constructor(message: string, statusCode?: number, retryAfter?: number);
}
//# sourceMappingURL=telegram-client.d.ts.map