import { exec, execSync, spawn } from 'child_process';
import { verify } from 'crypto';

const scrape = (cwd: string, method: string) => {
  //TODO fix asynchronicity problems, specifically when to return the data retrieved.
  // Ideas: Return a promise, resolve when child process exits
  // run ripgrep in a shell 
  return new Promise((resolve, reject) => {
    let result: string[] = [];
    const rg = spawn('rg', [`.${method}`, './'], { 
      cwd : cwd + '/server', 
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
        console.log(`Resolved result: \n${result}`);
        resolve(result);
    });
  });
};

const format = () => {};

const getRoutes = async (cwd: string) => {
    const finalData = {};
    const result = await scrape(cwd, 'get');
    console.log('ripgrep result in getRoutes: ', result);
}

export default getRoutes;