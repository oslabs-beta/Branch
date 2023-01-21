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
  let routerPaths;
  if (scrapedData['require'] && scrapedData['use']) {
    routerPaths = getRouterPaths(scrapedData['require'].split('\n'));
    delete scrapedData['require'];
    // TODO Second, filter through the 'use' statements, appending each route as a child to the parent route in treeData
    formatRouters(scrapedData['use'].split('\n'), routerPaths);
    delete scrapedData['use'];
  }

  // TODO Finally, iterate through each method in scrapedData, and place it under its respective router
  /**
    * REQUIREMENTS TO NOTE IN DOCS:
    *  - Router files must be just one folder deep
    *  - Files containing routes must end in .ts or .js
    */

  for (const method in scrapedData) {
    scrapedData[method] = scrapedData[method].split('\n');
    scrapedData[method] = scrapedData[method].forEach(
      (route) => {
        if (route === '') return;
        // Slice the name of the route out of the full route string
        /**Ex: '/:parkCode' */
        const routeNameRegEx = new RegExp(`(?<=.${method}[(]').*(?=',)`);
        let routeName = route.match(routeNameRegEx);
        routeName = routeName ? routeName[0] : undefined;

        // Slice the file name out of the full route string
        // matches any file name that is one folder deep and ends in .js or .ts
        /**Ex: './routers/UserRouter.js'*/
        let parentPath = route.match(/.\/.*\/.*(?=(\.[jt]s:))/);
        parentPath = parentPath ? parentPath[0] : undefined;
        console.log('routerPaths: ', routerPaths);
        console.log('   > Comparing: ', parentPath);
        if (Object.values(routerPaths).includes(parentPath)) {       
          // match the file name to a specific router
          // for every router
          console.log(`${routeName}, ${method}: found router`);
          for (const router of treeData.children) {
            // check if the current route already exists under its parent router
            if (routerPaths[router.name] === parentPath) {
              let childExists = false;
              for (const child of router.children) {
                if (child.name === routeName) {
                  childExists = true;
                  child.methods.push(method);
                  break;
                }
              }
              if (!childExists) {
                router.children.push({
                  name: routeName,
                  methods: [method],
                  reqParamRequired: /('\/:)/.test(route),
                  children: [],
                  parent: router.name
                });
              }
            }
          }
          // add the current method to that route's methods
          // Check if route name has a colon at the beginning. If it does, set reqParam = true.
        } else {
          treeData.children.push({
            name: routeName,
            methods: [method],
            reqParamRequired: /('\/:)/.test(route),
            children: [],
            parent: treeData.name
          });
        }
    });
  }
  // Send the final formatted data to the webview.
  console.log('TreeData to be sent to webview: ', treeData);
  webview.webview.postMessage(treeData);
  treeData = {
    name: `http://localhost:3000`,
    parent: null,
    reqParamRequired: false,
    children: [],
  };
};

const getRouterPaths = (routes) => {
  /**
   * REQUIREMENTS TO NOTE IN DOCS: 
   *  - folder containing router files shouls start with 'r'
   *  - import statements must be defined as constants
   */
  const routerPaths = {};
  routes.forEach((route) => {
    // pluck the router paths and names from the raw strings
    const routerPath = route.match(/(?<=(require[(]'))\.\/r.*(?=')/g);
    const routerName = route.match(/(?<=(const )).*(?=( =))/);
    if (routerPath && routerName) {
      routerPaths[routerName[0]] = routerPath[0];
    }
  });
  return routerPaths;
};

const formatRouters= (routes, routerPaths) => {
  routes.forEach((route) => {
    
    let routeName = route.match(/(?<=(use\(')).*(?=',)/);
    routeName = routeName ? routeName[0] : undefined;
    let routerName = route.match(/(?<=, ).*(?=\);)/);
    routerName = routerName ? routerName[0] : undefined;

    if (Object.keys(routerPaths).includes(routerName)) {
      routerPaths[routeName] = routerPaths[routerName];
      delete routerPaths[routerName];
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

const scraper = {};

/**
 * Uses ripgrep to scrape server information from the current workspace, and sends that data to a webview panel.
 * @param {vscode.webview} webview | The webview panel to send route data to
 */
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