'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const scraper_1 = require('./scraper');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
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
          ],
        }
      );
      //TODO Scrape HERE, make asynchronous, write all scraped data to a JSON file
      //TODO format the JSON like template.json, wrtite file to src directory
      if (vscode.workspace.workspaceFolders !== undefined) {
        const cwd = vscode.workspace.workspaceFolders[0].uri.path;
        (0, scraper_1.default)(cwd);
      } else {
        console.log('No working directory found!');
      }
      const onDiskPath = vscode.Uri.file(
        path.join(context.extensionPath, 'src', 'tree.js')
      );
      const jsSrc = panel.webview.asWebviewUri(onDiskPath);
      panel.webview.html = getWebviewContent(jsSrc, {});
    })
  );
}
exports.activate = activate;
function getWebviewContent(jsSrc, treeData) {
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
		<h1>This is the method: </h1>
		<h1 id="treeData"></h1>
		<h2>This is the fetch data:   <p id="fetch"></p></h2>
		<script>
			const TREE_DATA= ${treeData};
		</script>
		<script src="${jsSrc}"></script>
	</body>
  </html>`;
}
// This method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
