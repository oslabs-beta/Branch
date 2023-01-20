const vscode = require('vscode');
const { spawn } = require('child_process');

const scrapedData = {};
const METHODS = ['get', 'post', 'put', 'patch', 'delete'];
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
  // TODO First, filter through the 'require' statements, and map each router name to the path of the file.
  // Then, append the given routes to the root of treeData
  if (scrapedData['require'] && scrapedData['use']) {
    const routerPaths = getRouterPaths(scrapedData['require'].split('\n'));
    delete scrapedData['require'];
    // TODO Second, filter through the 'use' statements, appending each route as a child to the parent route in treeData
    formatRouters(scrapedData['use'].split('\n'), routerPaths);
    delete scrapedData['use'];
    console.log('Tree Data: ', treeData);
  }
  
  // TODO Finally, iterate through each method in scrapedData, and place it under it's respective router
  
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

  // Send the final formatted data to the webview.
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
    // pluck the router paths and names from the raw strings
    const routerPath = route.match(/(?<=(require[(]'))\.\/r.*(?=')/g);
    const routerName = route.match(/(?<=(const )).*(?=( =))/);
    if (routerPath && routerName) {
      routerMap[routerName[0]] = routerPath[0];
    }
  });
  return routerMap;
};

const formatRouters= (routes, routerPaths) => {
  routes.forEach((route) => {
    console.log('use route: ', route);
    let routeName = route.match(/(?<=(use\(')).*(?=',)/);
    routeName = routeName ? routeName[0] : undefined;
    let routerName = route.match(/(?<=, ).*(?=\);)/);
    routerName = routerName ? routerName[0] : undefined;
    console.log('Router Paths Keys: ', Object.keys(routerPaths));
    console.log('routeName: ', routeName);
    console.log('routerName: ', routerName);
    if (Object.keys(routerPaths).includes(routerName)) {
      treeData.children.push({
        name: routeName,
        reqParamRequired: false,
        methods: null,
        parent: treeData.name,
        children: []
      });
    }
  });
};
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