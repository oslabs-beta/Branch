"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('catCoding.start', () => {
        // Create and show panel
        const panel = vscode.window.createWebviewPanel('catCoding', 'Cat Coding', vscode.ViewColumn.One, {
            // Enable scripts in the webview
            enableScripts: true,
            // Only allow the webview to access resources in our extension's src directory
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src'))]
        });
        const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'tree.ts'));
        const tsSrc = panel.webview.asWebviewUri(onDiskPath);
        const onDiskModalPath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'modal.ts'));
        const modalSrc = panel.webview.asWebviewUri(onDiskModalPath);
        const onDiskCSSPath = vscode.Uri.file(path.join(context.extensionPath, 'src', 'styles.css'));
        const cssSrc = panel.webview.asWebviewUri(onDiskCSSPath);
        panel.webview.html = getWebviewContent(tsSrc, cssSrc, modalSrc);
    }));
}
exports.activate = activate;
function getWebviewContent(tsSrc, cssSrc, modalSrc) {
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
				test: 'data',
				test: 'data',
				test: 'data',
				test: 'data',
				test: 'data',
				test: 'data',
				test: 'data',
				test: 'data',
			}
				</textarea>
		</span>
	</div>
		<div class="input" >
			<h1>Query params</h1>
			<label for="key" >Key:</label>
			<input id="key"/>
			<label for="value" >Value:</label>
			<input id="value" />
			<label for="description">Description:</label>
			<input id="description" />
			<button onclick="addParams()">Add Params</button>
			<button onclick="clickHandler()">Check Route</button>
		</div>
		<script>
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
		<script src="${tsSrc}"></script>
	</body>
  </html>`;
}
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map