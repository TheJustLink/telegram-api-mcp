import { z, ZodTypeAny } from "zod";
/**
 * Declarative method definition.
 * Each Bot API method is described as data — not as a handler.
 * The MCP server auto-generates tools from these definitions.
 */
export interface MethodDef {
    /** Telegram Bot API method name (camelCase) */
    apiMethod: string;
    /** MCP tool name (snake_case) */
    toolName: string;
    /** Human-readable description for AI agents */
    description: string;
    /** Category for grouping and meta-mode search */
    category: MethodCategory;
    /** Parameter definitions */
    params: ParamDef[];
    /** Does this method need chat_id? (for rate limiting and defaults) */
    needsChatId: boolean;
    /** Can this method upload files? */
    canUploadFiles: boolean;
    /** Return type description */
    returns: string;
    /** MCP tool annotations — hints for clients about tool behavior */
    annotations?: ToolAnnotations;
}
/** MCP Tool Annotations per spec 2025-06-18 */
export interface ToolAnnotations {
    /** Tool only reads data, doesn't modify anything */
    readOnlyHint?: boolean;
    /** Tool may perform destructive/irreversible actions (default: true!) */
    destructiveHint?: boolean;
    /** Calling with same args gives same result */
    idempotentHint?: boolean;
    /** Tool interacts with external entities */
    openWorldHint?: boolean;
}
/** Common annotation presets for DRY */
export declare const ANNOTATIONS: {
    /** GET methods — read only, no side effects */
    readonly readOnly: ToolAnnotations;
    /** SEND methods — create content, not destructive */
    readonly send: ToolAnnotations;
    /** SET/EDIT methods — modify existing, idempotent */
    readonly modify: ToolAnnotations;
    /** DELETE/BAN methods — destructive, irreversible */
    readonly destructive: ToolAnnotations;
};
export type MethodCategory = "updates" | "bot" | "messages" | "editing" | "forwarding" | "media" | "polls" | "chat" | "members" | "invite" | "forum" | "stickers" | "inline" | "payments" | "business" | "stories" | "gifts" | "games" | "passport" | "managed_bots" | "other";
export interface ParamDef {
    /** Parameter name as in Bot API */
    name: string;
    /** Zod type for validation */
    type: ZodTypeAny;
    /** Is this parameter required? */
    required: boolean;
    /** Human-readable description */
    description: string;
}
export declare const ChatId: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
export declare const MessageId: z.ZodNumber;
export declare const UserId: z.ZodNumber;
export declare const Text: z.ZodString;
export declare const Caption: z.ZodString;
export declare const ParseMode: z.ZodEnum<["HTML", "Markdown", "MarkdownV2"]>;
export declare const FileInput: z.ZodString;
export declare const ReplyMarkup: z.ZodAny;
export declare const ReplyParameters: z.ZodAny;
export declare const MessageEntities: z.ZodAny;
export declare const LinkPreviewOptions: z.ZodAny;
export declare const BooleanFlag: z.ZodBoolean;
export declare const PositiveInt: z.ZodNumber;
export declare function commonSendParams(): ParamDef[];
export declare function commonMediaParams(): ParamDef[];
export declare function commonEditParams(): ParamDef[];
export declare function buildZodSchema(params: ParamDef[]): z.ZodObject<Record<string, ZodTypeAny>>;
export declare function buildJsonSchema(params: ParamDef[]): Record<string, unknown>;
//# sourceMappingURL=method-registry.d.ts.map