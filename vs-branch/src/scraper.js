const vscode = require('vscode');
const { spawn } = require('child_process');

const scrapedData = {};
// increment MAX_SCRAPES for every additional scrape required before formatting
const MAX_SCRAPES = 8;
let scrapeCount = 0;
let treeData = {
  name: `http://localhost:3000`,
  parent: null,
  reqParamRequired: false,
  children: [],
};

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

//===============================
// SCRAPE - searches the current working director (cwd) for all instances of a specific method using ripgrep
//===============================

const scrape = (cwd, method, webview) => {
  let result;
  const rg = spawn('rg', [`(.${method}[(]['"][./])`, './'], {
    cwd: cwd + '/server',
  });

  rg.stdout.on('data', (data) => {
    console.log(`ripgrep stdout ${method}: \n${data}`);
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
    if (result) {
      scrapedData[method] = result.toString();
    }
    console.log('Scrape Count: ', scrapeCount);
    if (scrapeCount >= MAX_SCRAPES) {
      format(webview);
      scrapeCount = 0;
    }
  });
};

//===============================
// FORMAT - takes the raw scraped data and formats it into a usable structure
//===============================

const format = (webview) => {
  // First, filter through the 'require' statements, and map each router name to the path of the file.
  let routerPaths = null;
  if (scrapedData['require']) {
    routerPaths = getRouterPaths(scrapedData['require'].split('\n'))
    delete scrapedData['require'];
  }
  console.log('Router Paths: ', routerPaths);
  for (const method in scrapedData) {
    scrapedData[method] = scrapedData[method].split('\n');
    scrapedData[method] = scrapedData[method].map(
      (route) => {
        // Slice the name of the route out of the full route string
        // Old RegExp => /(?<=([.](use|get|post|delete|put|patch))|(require))/
        const methodExp = new RegExp(`(?<=[.](${method}))`, 'g');
        const methodIndex = route.search(methodExp);
        const commaIndex = route.search(/,/);
        const routeName= route.slice(methodIndex + 2, commaIndex - 1);
      }
    );
  }

  webview.webview.postMessage(treeData);
};

const getRouterPaths = (routes) => {
  /**
   * REQUIREMENTS TO NOTE IN DOCS: 
   *  - folder containing router files shouls start with 'r'
   *  - import statements must be defined as constants
   */
  const routerMap = {};
  routes.forEach((route) => {
    console.log('Raw Route: ', route);
    // pluck the router paths and names from the raw strings
    const routerPath = route.match(/(?<=(require[(]'))\.\/r.*(?=')/g);
    const routerName = route.match(/(?<=(const )).*(?=( =))/);
    if (routerPath && routerName) {
      routerMap[routerName[0]] = routerPath[0];
    }
  });
  return routerMap;
} 

//===============================
// RoutesAndData - executes SCRAPE on all method types asyncronously
//===============================

const scraper = {};

scraper.getRoutes = (webview) => {
  if (vscode.workspace.workspaceFolders) {
    const cwd = vscode.workspace.workspaceFolders[0].uri.path;
    scrape(cwd, 'use', webview);
    scrape(cwd, 'get', webview);
    scrape(cwd, 'post', webview);
    scrape(cwd, 'delete', webview);
    scrape(cwd, 'put', webview);
    scrape(cwd, 'patch', webview);
    scrape(cwd, 'require', webview);
    scrape(cwd, 'listen', webview);
  } else {
    console.error('No workspace directory found!');
  }
};

module.exports = scraper;