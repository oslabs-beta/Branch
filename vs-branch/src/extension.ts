// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import vscode = require('vscode');
import * as path from 'path';

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
				// Only allow the webview to access resources in our extension's media directory
				localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src'))]
			}
		  );
	
			const onDiskPath = vscode.Uri.file(
        path.join(context.extensionPath, 'src', 'tree.js')
      );
      const jsSrc = panel.webview.asWebviewUri(onDiskPath);

			panel.webview.html = getWebviewContent(jsSrc);
		})
	  );

}


function getWebviewContent(jsSrc: vscode.Uri) {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script>
	  <style>
	
	  .node {
		  cursor: pointer;
	  }
  
	  .node circle {
		fill: #fff;
		stroke: steelblue;
		stroke-width: 3px;
	  }
  
	  .node text {
		font: 12px sans-serif;
		fill: white;
	  }
  
	  .link {
		fill: none;
		stroke: #ccc;
		stroke-width: 2px;
	  }
	  
	  </style>
  </head>
  <body>
		<h1>This is the method: </h1>
		<h1 id="treeData"></h1>
		<h2>This is the fetch data:   <p id="fetch"></p></h2>
		<script src="${jsSrc}"></script>
	</body>
  </html>`;
  }

// This method is called when your extension is deactivated
export function deactivate() {}
