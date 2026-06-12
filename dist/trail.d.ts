/**
 * trail.ts — TRAIL Protocol v2.1 (Tracking Records Across Isolated Logs)
 *
 * Reference implementation for TypeScript MCP servers.
 * https://github.com/timoncool/trail-spec
 *
 * Usage:
 *   import { Trail } from "./trail";
 *   const trail = new Trail("./data", "my-mcp-server");
 *   await trail.append("civitai:image:12345", "posted", "daily-post", { details: { platform: "telegram" } });
 *   const { entries, total } = await trail.query({ content_id: "civitai:image:12345" });
 */
export interface TrailEntry {
    version: number;
    timestamp: string;
    content_id: string;
    action: string;
    requester: string;
    details?: Record<string, unknown>;
    trace_id?: string;
    server?: string;
    entry_id?: string;
    caused_by?: string;
    tags?: string[];
}
export interface TrailQuery {
    /** Filter by content ID (exact match, or prefix ending with ':') */
    content_id?: string;
    /** Filter by action (string or array for multi-action filtering) */
    action?: string | string[];
    /** Filter by requester */
    requester?: string;
    /** Filter by trace ID */
    trace_id?: string;
    /** Filter by server name */
    server?: string;
    /** Filter entries that have ALL specified tags */
    tags?: string[];
    /** ISO 8601 timestamp — only return entries after this time */
    since?: string;
    /** Max entries to return, newest first (0 = unlimited, default 50) */
    limit?: number;
    /** Number of entries to skip for pagination */
    offset?: number;
}
export interface TrailAppendOptions {
    details?: Record<string, unknown>;
    trace_id?: string;
    server?: string;
    entry_id?: string;
    caused_by?: string;
    tags?: string[];
}
export interface TrailQueryResult {
    entries: TrailEntry[];
    total: number;
}
export interface TrailStats {
    total_entries: number;
    by_action: Record<string, number>;
    unique_content_ids: number;
    first_entry: string | null;
    last_entry: string | null;
}
export declare class Trail {
    private static readonly FILENAME;
    private static readonly VERSION;
    private readonly filePath;
    private readonly serverName?;
    private readonly _mutex;
    constructor(dataDir: string, server?: string);
    /**
     * Append an event to the trail.
     * Thread-safe — serialized via async mutex.
     */
    append(content_id: string, action: string, requester: string, options?: TrailAppendOptions): Promise<TrailEntry>;
    /** Query the trail with filters. Returns entries newest first + total count. */
    query(q?: TrailQuery): Promise<TrailQueryResult>;
    /** Get summary statistics for the trail. */
    stats(requester?: string, since?: string): Promise<TrailStats>;
    /** Check if content was already posted. */
    isUsed(content_id: string, requester?: string): Promise<boolean>;
    /** Get set of all posted content IDs. */
    getUsedIds(requester?: string): Promise<Set<string>>;
}
//# sourceMappingURL=trail.d.ts.map