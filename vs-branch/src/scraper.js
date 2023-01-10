"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const scrapedData = {};
let scrapeCount = 0;
class RouteTree {
    constructor(name, reqParamRequired, methods, parent, children) {
        this.name = name;
        this.reqParamRequired = reqParamRequired;
        this.parent = parent;
        this.children = children;
        this.methods = methods;
    }
    addChild(child) {
        if (this.children) {
            this.children.push(child);
        }
    }
    setParent(parent) {
        this.parent = parent;
    }
    addMethod(method) {
        if (this.methods) {
            this.methods.push(method);
        }
    }
}
const scrape = (cwd, method) => {
    let result;
    const rg = (0, child_process_1.spawn)('rg', [`(.${method}[(]['"][./])`, './'], {
        cwd: cwd + '/server',
    });
    rg.stdout.on('data', (data) => {
        // console.log(`ripgrep stdout ${method}: \n${data}`);
        result = data;
    });
    rg.stderr.on('data', (data) => {
        console.log(`ripgrep: stderr: ${data}`);
    });
    rg.on('error', (error) => {
        console.log(`ripgrep: error: ${error.message}`);
    });
    rg.on('close', (code) => {
        scrapeCount++;
        console.log(`ripgrep: ${method} exited with code ${code}`);
        scrapedData[method] = result.toString();
        if (scrapeCount >= 7) {
            format();
        }
    });
};
const format = () => {
    console.log('Format Running');
    const result = new RouteTree('/', false);
    const splitData = {};
    for (const method in scrapedData) {
        splitData[method] = scrapedData[method].split('\n');
    }
    console.log(splitData);
};
const getRoutes = async (cwd) => {
    const finalData = {};
    scrape(cwd, 'use');
    scrape(cwd, 'get');
    scrape(cwd, 'post');
    scrape(cwd, 'delete');
    scrape(cwd, 'put');
    scrape(cwd, 'patch');
    scrape(cwd, 'require');
};
exports.default = getRoutes;
//# sourceMappingURL=scraper.js.map