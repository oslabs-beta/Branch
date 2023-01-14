const vscode = require('vscode');
const { spawn } = require('child_process');

const scrapedData = {};
let scrapeCount = 0;
const treeData = {};

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

const scrape = (cwd, method) => {
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
    scrapedData[method] = result.toString();
    if (scrapeCount >= 7) {
      format();
    }
  });
};

//===============================
// FORMAT - takes the raw scraped data and formats it into a usable structure
//===============================

const format = () => {
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
            reqParamRequired: 'false',
            children: [],
          });
        }
      }
    );
  }
  console.log('treeData After format: ', treeData);
};

//===============================
// RoutesAndData - executes SCRAPE on all method types asyncronously
//===============================

function getRoutes() {
  if (vscode.workspace.workspaceFolders) {
    const cwd = vscode.workspace.workspaceFolders[0].uri.path;
    scrape(cwd, 'use');
    scrape(cwd, 'get');
    scrape(cwd, 'post');
    scrape(cwd, 'delete');
    scrape(cwd, 'put');
    scrape(cwd, 'patch');
    scrape(cwd, 'require');
    return treeData;
  } else {
    console.error('No workspace directory found!');
  }
};

module.exports = getRoutes, treeData;