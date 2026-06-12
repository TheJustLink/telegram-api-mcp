import { MethodDef } from "../method-registry.js";
/**
 * Complete registry of ALL Telegram Bot API 9.6 methods.
 * Each method is defined declaratively �� no handler code, just data.
 */
export declare const allMethods: MethodDef[];
/** Lookup method by tool name */
export declare function findMethodByToolName(toolName: string): MethodDef | undefined;
/** Lookup method by API method name */
export declare function findMethodByApiName(apiMethod: string): MethodDef | undefined;
/** Search methods by keyword (for meta-mode) */
export declare function searchMethods(query: string): MethodDef[];
//# sourceMappingURL=index.d.ts.map