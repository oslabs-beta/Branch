"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
/**
 * Object output formatting:
 * {
 *    name: 'http://localhost:3000',
 *    parent: null,
 *    children: [
 *        {
 *
 *        }
 *    ]
 * }
 */
const scrape = (cwd, method) => {
    //TODO fix asynchronicity problems, specifically when to return the data retrieved.
    // Ideas: Return a promise, resolve when child process exits
    // run ripgrep in a shell 
    return new Promise((resolve, reject) => {
        let result = [];
        const rg = (0, child_process_1.spawn)('rg', [`.${method}`, './'], {
            cwd: cwd + '/server',
        });
        rg.stdout.on("data", data => {
            console.log(`ripgrep stdout: \n${data}`);
            result = data;
        });
        rg.stderr.on("data", data => {
            console.log(`ripgrep stderr: ${data}`);
            reject(data);
        });
        rg.on('error', (error) => {
            console.log(`ripgrep error: ${error.message}`);
            reject(error);
        });
        rg.on("close", code => {
            console.log(`ripgrep exited with code ${code}`);
            console.log(`Resolved result: ${result}`);
            resolve(result);
        });
    });
};
const format = () => { };
const getRoutes = async (cwd) => {
    const finalData = {};
    const result = await scrape(cwd, 'get');
    console.log('ripgrep result in getRoutes: ', result);
};
exports.default = getRoutes;
//# sourceMappingURL=scraper.js.map