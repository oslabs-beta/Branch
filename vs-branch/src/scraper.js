"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const scraper = {
    scrape: async (cwd, method) => {
        try {
            // run ripgrep in a shell 
            // ~$ rg app VS-Branch
            // ~/VS-Branch $ rg app ./
            let result = [];
            const rg = (0, child_process_1.spawn)('rg', [`app.${method}`, './'], {
                cwd: cwd + '/server',
            });
            rg.stdout.on("data", data => {
                console.log(`ripgrep stdout: ${data}`);
                result = [...result, data.split('\n')];
            });
            rg.stderr.on("data", data => {
                console.log(`ripgrep stderr: ${data}`);
            });
            rg.on('error', (error) => {
                console.log(`ripgrep error: ${error.message}`);
            });
            rg.on("close", code => {
                console.log(`ripgrep exited with code ${code}`);
            });
            return result;
        }
        catch (err) {
            console.log(err);
        }
    }
};
exports.default = scraper;
//# sourceMappingURL=scraper.js.map