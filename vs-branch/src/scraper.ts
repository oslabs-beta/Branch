import { exec, execSync, spawn } from 'child_process';

const scraper = {
  scrape: async (cwd: string, method: string) => {
    try {
      // run ripgrep in a shell 
      // ~$ rg app VS-Branch
      // ~/VS-Branch $ rg app ./
      let result: string[] = [];
      const rg = spawn('rg', [`app.${method}`, './'], { 
        cwd : cwd + '/server', 
      });
  
      rg.stdout.on("data", data => {
        console.log(`ripgrep stdout: ${data}`);
        result = [...result, data.split('\n')]
      });
      
      rg.stderr.on("data", data => {
          console.log(`ripgrep stderr: ${data}`);
      });
      
      rg.on('error', (error) => {
          console.log(`ripgrep error: ${error.message}`);
      });
      
      rg.on("close", code => {
          console.log(`ripgrep exited with code ${code}`);
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  }
};

export default scraper;