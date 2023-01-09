import { exec, execSync, spawn } from 'child_process';
import { verify } from 'crypto';

// import fs from 'fs';
const fs = require('fs');
const path = require('path');

const scrapedData: string[] = [];

const scrape = (cwd: string, method: string) => {
  //TODO fix asynchronicity problems, specifically when to return the data retrieved.
  // Ideas: Return a promise, resolve when child process exits
  // run ripgrep in a shell 
  let result: string = '';
  let rg;
  rg = spawn('rg', [`.${method}`, './'],
    { 
      cwd : cwd + '/server', 
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
      console.log (`scrapedData: `, scrapedData);
      // console.log(`fs:  `, fs);
      // const fullPath = path.resolve(__dirname, 'test.ts');
      // console.log('FULL PATH: ', fullPath);
      // fs.writeFileSync(fullPath, result, {"flag": "a+"});
      if(scrapedData.length > 3) {
        format(scrapedData);
      }
  });
};

const format = (input: string[]) => {
  console.log('scrapedData in format: ', input);
};

const getRoutes = async (cwd: string) => {
  const finalData = {};
  const getResult = await scrape(cwd, 'get');
  const putResult = await scrape(cwd, 'post');
  // const patchResult = await scrape(cwd, 'patch');
  const postResult = await scrape(cwd, 'put');
  const deleteResult = await scrape(cwd, 'delete');
  
};


export default getRoutes;