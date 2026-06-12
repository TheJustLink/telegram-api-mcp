#!/usr/bin/env node
import { loadConfig } from "./config.js";
import { startServer } from "./server.js";
async function main() {
    try {
        const config = loadConfig();
        await startServer(config);
    }
    catch (error) {
        process.stderr.write(`Fatal: ${error.message}\n`);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=index.js.map