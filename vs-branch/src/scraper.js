const vscode = require('vscode');
const { spawn } = require('child_process');

const scrapedData = {};
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
    if (scrapeCount >= 7) {
      format(webview);
      scrapeCount = 0;
    }
  });
};

//===============================
// FORMAT - takes the raw scraped data and formats it into a usable structure
//===============================

const format = (webview) => {
  /**
    "./routes/api.js:router.get('/home', userController.getUser, (req, res) => {",
    "./routes/api.js:router.put('/points', userController.updateUser, (req, res) => {",
    "./routes/api.js:router.post('/signup/request', userController.createUser, (req, res) => {",
   */
  const splitData = {};
  // console.log('PRE SCRAPED DATA', scrapedData);
  for (const method in scrapedData) {
    splitData[method] = scrapedData[method].split('\n');
    splitData[method] = splitData[method].map(
      (route) => {
        // const filter = new RegExp(`/[.]get[(]['"][./]/`);
        // const index = route.search(/.get/);

        // TODO NOTE TO FUTURE SELVES -- If adding future HTTP request types,
        // they must be added to the regex below.
        const index = route.search(
          /(?<=([.](use|get|post|delete|put|patch))|(require))/
        );
        // [(]['"][.]*[/]
        const commaIndex = route.search(/,/);
        const slicedRoute = route.slice(index + 2, commaIndex - 1);

        // //index of the last paren after the require filename
        // const lastParenInd = route.search(/[)]/);
        // console.log('COMMA INDEX & PAREN IND', commaIndex + 1, lastParenInd);
        // const routeFile = route.slice(commaIndex + 1, lastParenInd);
        // console.log('ROUTE FILE NAME: ', routeFile);
        // console.log('route: ', route);
        const use = /[.]use/;
        const colon = /:/;

        // console.log('ROUTE', route, 'COLON TEST', colon.test(slicedRoute));
        // if route has dot use in it and there is no colon
        if (use.test(route) && !colon.test(slicedRoute)) {
          //push the child into the treeData object with localhost as the parent & reqParamRequired as false
          treeData['children'].push({
            name: `${slicedRoute}`,
            parent: `http://localhost:3000`,
            reqParamRequired: false,
            children: [],
          });
        }
      }
    );
  }
  console.log('treeData After format: ', treeData);
  console.log('Sending message to webview...');
  webview.webview.postMessage(treeData);
  treeData = {
    name: `http://localhost:3000`,
    parent: null,
    reqParamRequired: false,
    children: [],
  };
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
  } else {
    console.error('No workspace directory found!');
  }
};

module.exports = scraper;