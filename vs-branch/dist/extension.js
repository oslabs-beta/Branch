/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('catCoding.start', () => {
        // Create and show panel
        const panel = vscode.window.createWebviewPanel('catCoding', 'Cat Coding', vscode.ViewColumn.One, {
            // Enable scripts in the webview
            enableScripts: true,
            // // Only allow the webview to access resources in our extension's media directory
            // localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))]
        });
        panel.webview.html = getWebviewContent();
    }));
}
exports.activate = activate;
function getWebviewContent() {
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

	  <script>
	  let treeData = [
		{
		  "name": "LocalHost:8000",
		  "parent": "null",
		  "children": [
			{
			  "name": "/User",
			  "parent": "LocalHost:8000",
			  "children": [
			  {
				  "name": "/",
				  "method": "GET",
				  "person" : 1,
				  "parent": "LocalHost:8000"
				},
				{
				  "name": "/login",
				  "method": "POST",
				  "person" : 2,
				  "parent": "LocalHost:8000"
				},
				{
				  "name": "/createuser",
				  "method": "POST",
				  "person" : 3,
				  "parent": "LocalHost:8000"
				}
			  ]
			},
			{
			  "name": "/about",
			  "parent": "LocalHost:8000"
			}
		  ]
		}
	  ];
	  
	  
	  // ************** Generate the tree diagram	 *****************
	  let margin = {top: 20, right: 120, bottom: 20, left: 120},
		  width = 960 - margin.right - margin.left,
		  height = 500 - margin.top - margin.bottom;
		  
	  let i = 0,
		  duration = 750,
		  root;
	  
	  let tree = d3.layout.tree()
		  .size([height, width]);
	  
	  let diagonal = d3.svg.diagonal()
		  .projection(function(d) { return [d.y, d.x]; });
	  
	  let svg = d3.select("body").append("svg")
		  .attr("width", width + margin.right + margin.left)
		  .attr("height", height + margin.top + margin.bottom)
		.append("g")
		  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	  
	  root = treeData[0];
	  root.x0 = height / 2;
	  root.y0 = 0;
		
	  update(root);
	  
	  d3.select(self.frameElement).style("height", "500px");
	  
	  function update(source) {
	  
		// Compute the new tree layout.
		let nodes = tree.nodes(root).reverse(),
			links = tree.links(nodes);
	  
		// Normalize for fixed-depth.
		nodes.forEach(function(d) { d.y = d.depth * 180; });
	  
		// Update the nodes…
		let node = svg.selectAll("g.node")
			.data(nodes, function(d) { return d.id || (d.id = ++i); });
	  
		// Enter any new nodes at the parent's previous position.
		let nodeEnter = node.enter().append("g")
			.attr("class", "node")
			.attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
			.on("click", click);
	  
		nodeEnter.append("circle")
			.attr("r", 1e-6)
			.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
	  
		nodeEnter.append("text")
			.attr("x", function(d) { return d.children || d._children ? -13 : 13; })
			.attr("dy", ".35em")
			.attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
			.text(function(d) { return d.name; })
			.style("fill-opacity", 1e-6);
	  
		// Transition nodes to their new position.
		let nodeUpdate = node.transition()
			.duration(duration)
			.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
	  
		nodeUpdate.select("circle")
			.attr("r", 10)
			.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
	  
		nodeUpdate.select("text")
			.style("fill-opacity", 1);
	  
		// Transition exiting nodes to the parent's new position.
		let nodeExit = node.exit().transition()
			.duration(duration)
			.attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
			.remove();
	  
		nodeExit.select("circle")
			.attr("r", 1e-6);
	  
		nodeExit.select("text")
			.style("fill-opacity", 1e-6);
	  
		// Update the links…
		let link = svg.selectAll("path.link")
			.data(links, function(d) { return d.target.id; });
	  
		// Enter any new links at the parent's previous position.
		link.enter().insert("path", "g")
			.attr("class", "link")
			.attr("d", function(d) {
			  let o = {x: source.x0, y: source.y0};
			  return diagonal({source: o, target: o});
			});
	  
		// Transition links to their new position.
		link.transition()
			.duration(duration)
			.attr("d", diagonal);
	  
		// Transition exiting nodes to the parent's new position.
		link.exit().transition()
			.duration(duration)
			.attr("d", function(d) {
			  let o = {x: source.x, y: source.y};
			  return diagonal({source: o, target: o});
			})
			.remove();
	  
		// Stash the old positions for transition.
		nodes.forEach(function(d) {
		  d.x0 = d.x;
		  d.y0 = d.y;
		});
	  }
	  
	  // Event handler for clicking a node
	  function click(d) {
		  console.log(d.method, d.name)
		  const methodData = document.getElementById('treeData');
		  methodData.textContent = d.method;

		  const fetchData = document.getElementById('fetch');

		  if (d.person === 1) {
			fetch('https://swapi.dev/api/people/1')
			.then((response) => response.json())
			.then((data) => {
				fetchData.textContent = data.name;
		  });
		  }
		  if (d.person === 2) {
			fetch('https://swapi.dev/api/people/2')
			.then((response) => response.json())
			.then((data) => {
				fetchData.textContent = data.name;
		  });
		  }
		  if (d.person === 3) {
			fetch('https://swapi.dev/api/people/3')
			.then((response) => response.json())
			.then((data) => {
				fetchData.textContent = data.name;
		  });
		  }

	  
		if (d.children) {
		  d._children = d.children;
		  d.children = null;
		} else {
		  d.children = d._children;
		  d._children = null;
		}
		update(d);
	  }
	  
    </script>
</body>
  </html>`;
}
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map