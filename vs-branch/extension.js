const vscode = require('vscode');
const path = require('path');
const scraper = require('./src/scraper');

function activate(context) {
	console.log('Extension Running!');

	let panel;
	let start = vscode.commands.registerCommand('vs-branch.start', function () {
		panel = vscode.window.createWebviewPanel(
			'vs-branch',
			'VS | Branch',
			vscode.ViewColumn.One,
			{
				// Enable scripts in the webview
				enableScripts: true,
				// Only allow the webview to access resources in our extension's src/dist directories
				localResourceRoots: [
					vscode.Uri.file(path.join(context.extensionPath, 'src')),
					vscode.Uri.file(path.join(context.extensionPath, 'out')),
				],
			}
		);

		const jsSrc = panel.webview.asWebviewUri(
			vscode.Uri.file(
				path.join(context.extensionPath, 'out', 'main.js')
			));
		const cssSrc = panel.webview.asWebviewUri(
			vscode.Uri.file(
				path.join(context.extensionPath, 'src', 'styles.css')
			));
		
		panel.webview.html = getWebViewContent(jsSrc, cssSrc);
	});

	let scrape = vscode.commands.registerCommand('vs-branch.scrape', function () {
		vscode.window.showInformationMessage('Scraping Server files...');
		scraper.getRoutes(panel);
	});

	context.subscriptions.push(start, scrape);
}

function getWebViewContent(jsSrc, cssSrc) {
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
	<script type="text/javascript" src="${jsSrc}">
	</script>
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

	</body>
  </html>`;
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
