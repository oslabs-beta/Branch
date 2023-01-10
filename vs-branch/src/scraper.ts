import { spawn } from 'child_process';

const scrapedData = {
};
let scrapeCount: number = 0;

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

const scrape = (cwd: string, method: string) => {
  let result: string;
  const rg = spawn('rg', [`(.${method}[(]['"][./])`, './'], { 
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
    (scrapedData as any)[method] = result.toString();
    if (scrapeCount >= 7) { format(); }
  });
};

const format = () => {
  // 
  //
  console.log('Format Running');
  const result = new RouteTree('/', false);
  const splitData = {};
  for (const method in scrapedData) {
    (splitData as any)[method] = (scrapedData as any)[method].split('\n');
  }
  console.log(splitData);
  
};

const getRoutes = async (cwd: string) => {
  const finalData = {};
  scrape(cwd, 'use');
  scrape(cwd, 'get');
  scrape(cwd, 'post');
  scrape(cwd, 'delete');
  scrape(cwd, 'put');
  scrape(cwd, 'patch');
  scrape(cwd, 'require');
};

export default getRoutes;
