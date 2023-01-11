// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import vscode = require('vscode');
import * as path from 'path';
// const routesAndData = require('./scraper')
import routesAndData from "./scraper";


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      // Create and show panel
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {
          // Enable scripts in the webview
          enableScripts: true,
          // Only allow the webview to access resources in our extension's src directory
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, 'src')),
            vscode.Uri.file(path.join(context.extensionPath, 'dist')),
          ],
        }
      );

      // INTEGRATION WITH SCRAPER.TS
      if (vscode.workspace.workspaceFolders !== undefined) {
        const cwd = vscode.workspace.workspaceFolders[0].uri.path;
        routesAndData.getRoutes(cwd);
      } else {
        console.error('No working directory found!');
      }

      const onDiskPath = vscode.Uri.file(
        path.join(context.extensionPath, 'dist', 'tree.js')
      );
      const tsSrc = panel.webview.asWebviewUri(onDiskPath);

      const onDiskScraperPath = vscode.Uri.file(
        path.join(context.extensionPath, 'dist', 'scraper.js')
      );
      const scraperSrc = panel.webview.asWebviewUri(onDiskScraperPath);

      const onDiskCSSPath = vscode.Uri.file(
        path.join(context.extensionPath, 'src', 'styles.css')
      );
      const cssSrc = panel.webview.asWebviewUri(onDiskCSSPath);

      panel.webview.html = getWebviewContent(tsSrc, cssSrc, scraperSrc);
    })
  );
}

function getWebviewContent(
  tsSrc: vscode.Uri,
  cssSrc: vscode.Uri,
  scraperSrc: vscode.Uri
) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>VS|Branch</title>
	  <link rel="stylesheet" href="${cssSrc}" />
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script>
	  <script src="https://cdn.jsdelivr.net/npm/d3-zoom@3"></script>
	  <link rel="stylesheet"
	  href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/codemirror.min.css">
	</link>
	
	<script type="text/javascript"
	  src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/codemirror.min.js">
	</script>
	
  </head>
  <body>
  	
	<div class="container">
		<span class="treeContainer">
			<h1 class="mainheader" >Route Tree</h1>
		</span>
		<span class="responseContainer" >
			<textarea id="code-block">
			testObj = {
				test: 'data',
			}
				</textarea>
		</span>
	</div>
		<div class="input" id="input">
		<div >
			<h1>Query params</h1>
			<div>
			<span class="alert"></span>
			<label for="url" >URL: </label>
			<input class="url" id="url"/>
			<button onclick="checkParam()">Check Param</button>
			</div>
			<label for="key" >Key:</label>
			<input id="key" />
			<label for="value" >Value:</label>
			<input id="value" />
			<button onclick="addParams()">Add to Body</button>
			<button onclick="checkRoute()">Check Route</button>
		</div>
		<div>
			<h2>Req Body Field</h2>
			<div class="reqObj" ></div>
		</div>
	</div>
		
		<script type="text/javascript">
			// The codeMirror editor object
			let codemirror = CodeMirror.fromTextArea(
				document.getElementById("code-block"), 
				{
					lineNumbers     : true,
					lineWrapping    : true,
					mode            : "javascript",
					htmlMode        : false,
					theme           : "3024-night",
					readOnly        : true
			});

		</script>
		<script type="text/javascript" src="${tsSrc}">
		</script>
	</body>
  </html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
