import { spawn } from 'child_process';

// const treeData = {
//   name: `http://localhost:3000`,
//   parent: null,
//   reqParamRequired: 'false',
//   children: [],
// };

const scrapedData = {};
let scrapeCount = 0;

class RouteTree {
  name: string;
  reqParamRequired: boolean;
  methods?: string[];
  parent?: string;
  children?: RouteTree[];

  constructor(
    name: string,
    reqParamRequired: boolean,
    methods?: string[],
    parent?: string,
    children?: RouteTree[]
  ) {
    this.name = name;
    this.reqParamRequired = reqParamRequired;
    this.parent = parent;
    this.children = children;
    this.methods = methods;
  }

  addChild(child: RouteTree): void {
    if (this.children) {
      this.children.push(child);
    }
  }

  setParent(parent: string): void {
    this.parent = parent;
  }

  addMethod(method: string): void {
    if (this.methods) {
      this.methods.push(method);
    }
  }
}
//===============================
// SCRAPE - searches the current working director (cwd) for all instances of a specific method using ripgrep
//===============================

const scrape = (cwd: string, method: string) => {
  let result: string;
  const rg = spawn('rg', [`(.${method}[(]['"][./])`, './'], {
    cwd: cwd + '/server',
  });

  rg.stdout.on('data', (data: string) => {
    // console.log(`ripgrep stdout ${method}: \n${data}`);
    result = data;
  });

  // deno-lint-ignore no-explicit-any
  rg.stderr.on('data', (data: any) => {
    // console.log(`ripgrep: stderr: ${data}`);
  });

  // deno-lint-ignore no-explicit-any
  rg.on('error', (error: { message: any }) => {
    console.log(`ripgrep: error: ${error.message}`);
  });

  // deno-lint-ignore no-explicit-any
  rg.on('close', (code: any) => {
    scrapeCount++;
    // console.log(`ripgrep: ${method} exited with code ${code}`);
    // deno-lint-ignore no-explicit-any
    (scrapedData as any)[method] = result.toString();
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
  // console.log('Format Running');

  // deno-lint-ignore no-unused-vars
  const result = new RouteTree('/', false);
  const splitData = {};
  // console.log('PRE SCRAPED DATA', scrapedData);
  for (const method in scrapedData) {
    // deno-lint-ignore no-explicit-any
    (splitData as any)[method] = (scrapedData as any)[method].split('\n');
    (splitData as any)[method] = (splitData as any)[method].map(
      (route: string) => {
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
        //if route has dot use in it and there is no colon
        if (use.test(route) && !colon.test(slicedRoute)) {
          //push the child into the treeData object with localhost as the parent & reqParamRequired as false
          routesAndData.treeData['children'].push({
            name: `${slicedRoute}`,
            parent: `http://localhost:3000`,
            reqParamRequired: 'false',
            children: [],
          });
        }

        /**
         * {
         *  'get': ['/', '/route2'],
         *  'put': ['/', '/route2', '/route3']
         * }
         */
        // console.log(method, ' index: ', index, 'sliced: ', slicedRoute);
        return slicedRoute;
      }
    );
  }
  console.log('treeData After: ', routesAndData.treeData);
  console.log(splitData);
};

//===============================
// RoutesAndData - executes SCRAPE on all method types asyncronously
//===============================

const routesAndData = {
  getRoutes: (cwd: string) => {
    scrape(cwd, 'use');
    scrape(cwd, 'get');
    scrape(cwd, 'post');
    scrape(cwd, 'delete');
    scrape(cwd, 'put');
    scrape(cwd, 'patch');
    scrape(cwd, 'require');
  },
  treeData: {
    name: `http://localhost:3000`,
    parent: null,
    reqParamRequired: 'false',
    children: [],
  },
};

// const getRoutes = (cwd: string) => {
//   scrape(cwd, 'use');
//   scrape(cwd, 'get');
//   scrape(cwd, 'post');
//   scrape(cwd, 'delete');
//   scrape(cwd, 'put');
//   scrape(cwd, 'patch');
//   scrape(cwd, 'require');
// };

// export default getRoutes;
export default routesAndData;
