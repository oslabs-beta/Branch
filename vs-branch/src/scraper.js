"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
// import fs from 'fs';
const fs = require('fs');
const path = require('path');
const scrapedData = [];
const scrape = (cwd, method) => {
    //TODO fix asynchronicity problems, specifically when to return the data retrieved.
    // Ideas: Return a promise, resolve when child process exits
    // run ripgrep in a shell 
    let result = '';
    let rg;
    rg = (0, child_process_1.spawn)('rg', [`.${method}`, './'], {
        cwd: cwd + '/server',
    });
    rg.stdout.on("data", data => {
        console.log(`ripgrep stdout: \n${data}`);
        result = data;
    });
    rg.stderr.on("data", data => {
        console.log(`ripgrep stderr: ${data}`);
    });
    rg.on('error', (error) => {
        console.log(`ripgrep error: ${error.message}`);
    });
    rg.on("close", code => {
        console.log(`ripgrep exited with code ${code}`);
        console.log(`Resolved ${method} result: \n${result}`);
        scrapedData.push(result.toString());
        console.log(`scrapedData: `, scrapedData);
        // console.log(`fs:  `, fs);
        // const fullPath = path.resolve(__dirname, 'test.ts');
        // console.log('FULL PATH: ', fullPath);
        // fs.writeFileSync(fullPath, result, {"flag": "a+"});
        if (scrapedData.length > 3) {
            format(scrapedData);
        }
    });
};
const format = (input) => {
    console.log('scrapedData in format: ', input);
};
const getRoutes = async (cwd) => {
    const finalData = {};
    const getResult = await scrape(cwd, 'get');
    const putResult = await scrape(cwd, 'post');
    // const patchResult = await scrape(cwd, 'patch');
    const postResult = await scrape(cwd, 'put');
    const deleteResult = await scrape(cwd, 'delete');
};
exports.default = getRoutes;
//# sourceMappingURL=scraper.js.map