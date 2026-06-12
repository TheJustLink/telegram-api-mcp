export interface PostLogEntry {
    timestamp: string;
    method: string;
    chat_id: string | number;
    message_id?: number;
    /** External content ID (e.g. Civitai image ID) — for dedup by caller */
    content_id?: string;
    caption_preview?: string;
}
/** Append a log entry after a successful send/forward/copy. */
export declare function logPost(entry: PostLogEntry): Promise<void>;
/** Read post history, optionally filtered by chat_id. Returns newest first. */
export declare function getPostHistory(chatId?: string | number, limit?: number): Promise<PostLogEntry[]>;
//# sourceMappingURL=post-log.d.ts.map